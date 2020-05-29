import geopandas as gpd
import adampy as adam
import ipywidgets as widgets
import glob
import fiona
from meeo_sso_cli import login
import matplotlib.pyplot as plt
import pandas as pd
from bokeh.plotting import figure, output_file, show
from bokeh.io import push_notebook, show,output_notebook
import numpy as np
from IPython.display import display, clear_output
output_notebook(hide_banner=True)

def connect_to_server():
    #connect to mwcs server
    username = 'figuera'#add here username
    password = '110586ra'#add here password
    access_token = login( username, password )[ 'access_token' ]
    return access_token


list_cem = glob.glob("data/*.geojson")
list_cem.sort()

print('Select a Cemetery')
cem = widgets.Dropdown(
    options=list_cem,
    value=list_cem[0],
    description='Cemetery:',
    disabled=False,
)
cem

var = widgets.Dropdown(
    options=['Precipitation', 'Temperature', 'NO2', 'PM10', 'O3', 'SO2', 'CO'],
    value='Precipitation',
    description='Variable:',
    disabled=False,
)
var

date_st = widgets.DatePicker(
    description='Start date',
    disabled=False
)
date_st

date_end = widgets.DatePicker(
    description='End date',
    disabled=False
)
date_end

button = widgets.Button(description="Plot the data")
output = widgets.Output()

display(cem, var, date_st, date_end, button, output)
def on_button_clicked(b):
    with output:
        clear_output()
        print("Processing data for {}".format(cem.value[:-8]))
        polygon = cem.value
        #with fiona.open(polygon, "r") as shapefile:
        #    features = [feature["geometry"] for feature in shapefile]
            
        #lat = features[1]['coordinates'][1]
        #long = features[1]['coordinates'][0]
        df = gpd.read_file(polygon)
        lat = df['geometry'][0].centroid.y
        long = df['geometry'][0].centroid.x
        
        if var.value == 'Precipitation':
            collection = 'HYDRO_ESTIMATOR_DAILY_4326_0045'
            endpoint = 'dar05s.eodataservice.org'
            plot_label = 'Precipitation'
        elif var.value == 'Temperature':
            collection = 'ERA52mTempDaily_4326_025'
            endpoint = 'wcs.sistema.at'
            plot_label = 'Temperature'
        elif var.value == 'NO2':
            collection = 'vr_S5P_RPROOFFLNRTI_L2_NO2_PRODUCT_NITROGENDIOXIDE_TROPOSPHERIC_COLUMN'
            endpoint = 'wcs.top-platform.eu'
            plot_label = 'NO2'
        elif var.value == 'PM10':
            collection = 'vr_S5P_RPROOFFLNRTI_L2_AER_AI_PRODUCT_AEROSOL_INDEX'
            endpoint = 'wcs.top-platform.eu'
            plot_label = 'PM10'
        elif var.value == 'O3':
            collection = 'vr_S5P_RPROOFFLNRTI_L2_O3_PRODUCT_OZONE_TOTAL_VERTICAL_COLUMN'
            endpoint = 'wcs.top-platform.eu'
            plot_label = 'O3'
        elif var.value == 'SO2':
            collection = 'vr_S5P_RPROOFFLNRTI_L2_SO2_PRODUCT_SULFURDIOXIDE_TOTAL_VERTICAL_COLUMN'
            endpoint = 'wcs.top-platform.eu'
            plot_label = 'SO2'
        elif var.value == 'CO':
            collection = 'vr_S5P_RPROOFFLNRTI_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN'
            endpoint = 'wcs.top-platform.eu'
            plot_label = 'CO'
         
            
        time_t = '{}T00:00:00,{}T23:59:59'.format(date_st.value.strftime('%Y-%m-%d'), date_end.value.strftime('%Y-%m-%d'))
        #time_t = '2019-05-01T00:00:00,2019-05-31T23:59:59'
        access_token = connect_to_server()

        data, times = adam.getTimeSeries(endpoint, collection,time_t, lat, long, token = access_token).get_data()
        
        if var.value == 'Temperature':
            data = data - 273.15
        
        if collection.startswith('vr_'):
            data[data == 9.96921e+36] = 'nan'
            data[data < 0] = 'nan'
            
        n_dates = np.array(times, dtype=np.datetime64)
        n_values = np.array(data)
        p = figure(plot_width=800, plot_height=350,x_axis_type="datetime")
        
        if var.value == 'Temperature':
            p.line(n_dates, n_values)
        else:
            p.vbar(x = n_dates, top = n_values, width=0.1)
        p.xaxis.axis_label = 'Date'
        p.yaxis.axis_label = plot_label
        p.title.text = '{}'.format(cem.value[:-8])
        show(p)

button.on_click(on_button_clicked)

