import ipywidgets as widgets

from bokeh.plotting import figure, output_file, show
from bokeh.io import push_notebook, show,output_notebook
from bokeh.transform import dodge
from bokeh.models import ColumnDataSource

import numpy as np
from IPython.display import display, clear_output

import geopandas as gpd
import numpy as np
from datetime import datetime, timedelta, date
import matplotlib.pyplot as plt
import adampy as adam
import pandas as pd
import folium
from folium.plugins import Draw
from folium import plugins
import warnings
warnings.filterwarnings("ignore")
output_notebook(hide_banner=True)

print('Hover over the markers to see the number they have and select the number in the dropdown menu')

lat_arr = [48.076620, 48.104841, 48.158070, 48.188259, 48.209944, 48.121132,48.138608,48.135877,48.177331, 48.217387]
long_arr = [14.053083,14.090768, 14.160920, 14.207773, 14.274196, 14.753665, 14.929840, 15.057037, 15.186369, 15.323153]
name = [1,2,3,4,5,6,7,8,9,10]

m = folium.Map(
    location=[48.2, 14.4],
    zoom_start=9,
    tiles='Stamen Terrain'
)

tooltip = 'Click me!'

for i in range(0,len(lat_arr)):
    folium.Marker([lat_arr[i], long_arr[i]], popup='Long: {} Lat: {}'.format(long_arr[i], lat_arr[i]), tooltip=name[i]).add_to(m)

#folium.Marker([45.3288, -121.6625], popup='<i>Mt. Hood Meadows</i>', tooltip=tooltip).add_to(m)
#folium.Marker([45.3311, -121.7113], popup='<b>Timberline Lodge</b>', tooltip=tooltip).add_to(m)

m


loca = widgets.Dropdown(
    options=name,
    description='Location:',
    value=1,
    disabled = False
)
loca


#collection = 'vr_S5P_OFFLNRTI_L2__CO'
#collection = 'vr_S5P_OFFLNRTI_L2__SO2'
#collection = 'vr_S5P_OFFLNRTI_L2__O3'
collections = ['vr_S5P_RPROOFFLNRTI_L2_NO2_PRODUCT_NITROGENDIOXIDE_TROPOSPHERIC_COLUMN', 'vr_S5P_RPROOFFLNRTI_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN']

col = widgets.Dropdown(
    options=collections,
    description='Collection:',
    value='vr_S5P_RPROOFFLNRTI_L2_NO2_PRODUCT_NITROGENDIOXIDE_TROPOSPHERIC_COLUMN',
    disabled = False
)
col

button = widgets.Button(description="Plot the data")
output = widgets.Output()

display(m, loca, col, button, output)

def on_button_clicked(b):
    with output:
        clear_output()
        print("Processing {} data for point number {}".format(col.value, loca.value))
        print("It might take a while :)")

        lat = lat_arr[loca.value]
        long = long_arr[loca.value]

        time_t = '2019-07-01T00:00:00,2019-09-03T23:59:59'

        data, times = adam.getTimeSeries('wcs.top-platform.eu', col.value,time_t, lat, long).get_data()

        time_t = '2018-07-01T00:00:00,2018-09-03T23:59:59'

        data1, times1 = adam.getTimeSeries('wcs.top-platform.eu', col.value,time_t, lat, long).get_data()

        data[data == 9.96921e+36] = 'nan'
        data[data < 0] = 'nan'

        data1[data1 == 9.96921e+36] = 'nan'
        data1[data1 < 0] = 'nan'

        # Create an empty dataframe
        df = pd.DataFrame()
        df2 = pd.DataFrame()
        # Create a column from the datetime variable
        df['datetime'] = times
        df2['datetime'] = times1
        # Convert that column into a datetime datatype
        df['datetime'] = pd.to_datetime(df['datetime'])
        df2['datetime'] = pd.to_datetime(df2['datetime'])
        # Set the datetime column as the index
        df.index = df['datetime']
        df2.index = df2['datetime']
        # Create a column from the numeric score variable
        df['2019'] = data
        df2['2018'] = data1

        #sum daily values
        newc = df.resample('D').sum()
        newc2 = df2.resample('D').sum()

        #give a name to the column
        newc.columns = ['em2019']
        newc2.columns = ['em2018']

        #group by month
        em2019 = newc.resample('M').sum()['em2019'].to_list()
        em2018 = newc2.resample('M').sum()['em2018'].to_list()

        #create a categorical axis
        x_val = ['July', 'August', 'September']


        data = {'x_val' : x_val,
                'y2018'   : em2018,
                'y2019'   : em2019}

        source = ColumnDataSource(data=data)

        p = figure(x_range=x_val, plot_width=800, plot_height=350, title='{} 2018 vs. 2019 @ {}, {}'.format(col.value.split('_')[-1] ,  long, lat))

        p.vbar(x=dodge('x_val', -0.15, range=p.x_range), top='y2018', width=0.2, source=source,
               color="#c9d9d3", legend="2018")

        p.vbar(x=dodge('x_val',  0.15,  range=p.x_range), top='y2019', width=0.2, source=source,
               color="#718dbf", legend="2019")


        p.x_range.range_padding = 0.1
        p.xgrid.grid_line_color = None
        p.legend.location = "top_right"
        p.legend.orientation = "horizontal"
        p.xaxis.axis_label = 'Month'
        p.yaxis.axis_label = 'NO2'

        show(p)


button.on_click(on_button_clicked)
