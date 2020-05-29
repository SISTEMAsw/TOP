from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
import psycopg2
#import pandas as pd
from django.core import serializers


def connect_to_db():
    conn = psycopg2.connect(dbname='ground_measurements', user='topro', password='#top2019', host='80.158.2.100', port='5432', sslmode='require')
    return conn

def get_query(start, end, value):
    query = "SELECT * FROM measurements INNER JOIN stations ON measurements.stations_id = stations.id INNER JOIN products ON measurements.observed_field = products.id" 
    query = query + get_start(start)
    query = query + get_end(end)
    query = query + get_product(value)
    return query

def convert_date(date):
    date_tmp = date.split("T")
    return date_tmp[0] + " " + date_tmp[1].replace("Z", "+01")

def get_start(start):
    return " AND measurements.observation_time_start >'"+ convert_date(start)

def get_end(end):
    return "' AND measurements.observation_time_start <'"+ convert_date(end)

def get_product(product):
    return "' AND products.product = '" + product +"';"

def get_data(value, start, end):
    conn = connect_to_db()
    query = get_query(start, end, value)
   # print(query)
    result = pd.read_sql_query(query, conn)
    result = result.drop('id', 1)
    result = result.drop('stations_id', 1)
    result = result.drop('product', 1)
    result = result.drop('observed_field', 1)
    response = HttpResponse(result.to_json(orient='records', force_ascii=False, date_format='iso', date_unit="s"), content_type='application/json')
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response
    #return HttpResponse(result.to_json(orient='records', force_ascii=False, date_format='iso', date_unit="s"), content_type='application/json') 


def get_pm10(request, start, end):
    return get_data('PM10', start, end)

def get_so2(request, start, end):
    return get_data('SO2', start, end)

def get_no2(request, start, end):
    return get_data('NO2', start, end)

def get_co(request, start, end):
    return get_data('CO', start, end)

def get_ground(request):
    conn = connect_to_db()
    query = "SELECT products.product, MAX(observation_time_start) AS end, MIN(observation_time_start) AS start FROM measurements INNER JOIN products ON measurements.observed_field = products.id GROUP BY products.product;"
    #result = pd.read_sql_query(query, conn)
    #response = HttpResponse(result.to_json(orient='records', force_ascii=False, date_format='iso', date_unit="s"), content_type='application/json')
    #return response
