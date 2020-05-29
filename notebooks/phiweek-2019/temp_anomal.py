import geopandas as gpd
import adampy as adam
import ipywidgets as widgets
import glob
import fiona
import matplotlib.pyplot as plt
import pandas as pd
from bokeh.plotting import figure, output_file, show
from bokeh.io import push_notebook, show,output_notebook
import numpy as np
from IPython.display import display, clear_output
from geopy.geocoders import Nominatim
output_notebook(hide_banner=True)

#print('Write the name of a city or location to compute the temperature anomaly')

city_w = widgets.Dropdown(
    options=['Barcelona', 'Berlin', 'Tokyo', 'Buenos Aires', 'Roma', 'Svalbard', 'Sidney', 'Wien', 'New York', 'Mumbai', 'Nairobi', 'Johannesburg', 'Nuuk'],
    description='Location:',
    value='Barcelona',
    disabled = False
)
city_w

button = widgets.Button(description="Plot the data")
output = widgets.Output()

display(city_w, button, output)


    
def on_button_clicked(b):
    with output:
        clear_output()
        print("Processing data for {}".format(city_w.value))
        print("It might take a while :)")
        
        city_in = city_w.value
        geolocator = Nominatim(user_agent="test")
        #location = geolocator.geocode(city_in)
        location = geolocator.geocode(city_in)

        lat = location[1][0]
        lon = location[1][1]
        city = location[0].split(',')[0]

        data, times = adam.getTimeSeries('wcs.sistema.at', 'ERA52mTempDaily_4326_025','1979-01-01T00:00:00,2018-12-31T23:59:59', lat = lat, long = lon).get_data()

        df3 = pd.DataFrame(
            {'date': times,
             'temperature': data
            })
        df3['temperature'] = df3['temperature'] - 273.15
        df3['date'] = pd.to_datetime(df3['date'])

        # create a new plot with a datetime axis type
        p1 = figure(plot_width=900, plot_height=400, x_axis_type="datetime", title = 'Temperature for 20 years in {}'.format(city_in))

        #min and max

        min_date = df3[df3['temperature']==df3.temperature.min()].index.values.astype(int)[0]
        p1.circle(df3.iloc[min_date].date, df3.iloc[min_date].temperature, size = 5, color = 'red')

        max_date = df3[df3['temperature']==df3.temperature.max()].index.values.astype(int)[0]
        p1.circle(df3.iloc[max_date].date, df3.iloc[max_date].temperature, size = 5, color = 'red')

        #lineplot

        p1.line(df3['date'], df3['temperature'], color='navy', alpha=0.5)

        #linear regression

        # determine best fit line
        par = np.polyfit(np.arange(0,len(df3['date'])), df3['temperature'], 1, full=True)
        slope=par[0][0]
        intercept=par[0][1]
        y_predicted = [slope*i + intercept  for i in np.arange(0,len(df3['date']))]


        mess = 'Temperature difference of {0:.2f} degrees'.format(y_predicted[-1] - y_predicted[0])


        p1.line(df3['date'],y_predicted,color='red',legend=mess)

        p1.legend.location = "bottom_left"

        show(p1)



button.on_click(on_button_clicked)

