#import urllib3.request
import requests
import xml.etree.ElementTree as ET
import os
import json
from datetime import datetime

path = os.path.dirname(os.path.abspath(__file__))

filename_1 = path + "/cams.json"
url_1 = "http://wps-eo4sdcr.adamplatform.eu/wps/wps?service=WPS&version=2.0.0&request=execute&Identifier=cams_forecast&datainputs=city=Vienna;cams_parameter=PM10"


filename_2 = path + "/cams_sp5.json"
url_2 = "http://wps-eo4sdcr.adamplatform.eu/wps/wps?service=WPS&version=2.0.0&request=execute&Identifier=cams_and_s5p&datainputs=city=Vienna;parameter=NO2"


def clean_data_no2(data):
    data[0]["data"] = data[0]["data"].replace("[", "").replace("]", "").replace(" ", "").split(',')
    tmp_list = [float(i.strip("'")) for i in data[0]["data"]]

    tmp_list_2 = []
    for i in tmp_list:
        #if i != 'null':
        #    i = float(i)*0.046
        tmp_list_2.append(i)
    data[0]["data"] = tmp_list_2

    data[1]["data"] = data[1]["data"].replace("[", "").replace("]", "").replace(" ", "").split(',')
    tmp_list = [i.replace("nan", "null") for i in data[1]["data"]]
    tmp_list = [i.replace("'None'", "null") for i in tmp_list]

    tmp_list_2 = []
    for i in tmp_list:
        if i != 'null':
            i = float(i.strip("'"))*0.046
        tmp_list_2.append(i)
    data[1]["data"] = tmp_list_2


    data[2]["data"] = data[2]["data"].replace("[", "").replace("]", "").replace(" ", "").split("'")
    tmp_list = [data[2]["data"][i].split(",")[0].split("T")[0] for i in range(len(data[2]["data"])) if i%2==1]
    data[2]["data"] = tmp_list

    return data


def clean_data_pm10(data):
    data[0]["data"] = data[0]["data"].replace("[", "").replace("]", "").replace(" ", "").split(',')
    data[1]["data"] = data[1]["data"].replace("[", "").replace("]", "").replace(" ", "").split("'")

    # Get index of None values
    get_indexes = lambda x, xs: [i for (y, i) in zip(xs, range(len(xs))) if x == y]
    index = get_indexes("None", data[0]["data"])

    # create new list without None values
    tmp_list = [float(i.strip("'")) for i in data[0]["data"] if i!='None']
    data[0]["data"] = tmp_list

    # clean date list
    tmp_list = [data[1]["data"][i] for i in range(len(data[1]["data"])) if i%2==1]
    data[1]["data"] = tmp_list

    # check with index
    for i in index:
        data[1]["data"][i] = 'None'

    # remove None values
    tmp_list = [i for i in data[1]["data"] if i!='None']
    data[1]["data"] = (line.split(",") for line in tmp_list)
    data[1]["data"] = list(data[1]["data"])

    return data


def save_file(filename, data):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file)

def add_log(data):
    print("error")
    with open('log', 'a') as file:
        file.write(datetime.now + ': ' + data + '\n')

def download_file(url):

    #print(datetime.now())
    resp = requests.get(url, timeout=None)
    #print(datetime.now())
    resp.encoding = 'utf-8'
    #print(datetime.now())
    data = resp.text

    root = ET.fromstring(data)
    ns = {  'wps' : 'http://www.opengis.net/wps/1.0.0',
            'ows' : 'http://www.opengis.net/ows/1.1'}
    Data_To_Use = []
    for process_outputs in root.findall('wps:ProcessOutputs', ns):
        for output in process_outputs.findall('wps:Output', ns):
            identifier = output.find('ows:Title', ns).text
            data = output.find('wps:Data', ns)
            for d in data.findall('wps:LiteralData', ns):
                Data_To_Use.append(
                    {
                        'identifier': identifier,
                        'data' : d.text
                    }
                )

    return Data_To_Use

if __name__ == "__main__":
   # try:
    data = download_file(url_1)
    data = clean_data_pm10(data)
    save_file(filename_1, data)
    data2 = download_file(url_2)
    data2 = clean_data_no2(data2)
    save_file(filename_2, data2)
   # except Exception as e:
    #    save_file('log', e)
