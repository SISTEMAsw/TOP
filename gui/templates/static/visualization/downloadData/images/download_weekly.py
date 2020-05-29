import requests
import shutil
import datetime
from subprocess import Popen, PIPE
import subprocess
import os 

import matplotlib.pyplot as plt
import matplotlib as mpl
import cmaps
import numpy as np


base_url = "http://vtapp4aq.zamg.ac.at/wcs?"

service_url = "service=WCS&Request=GetCoverage&version=2.0.1"

coverage_id ="&CoverageId=S5P_OFFLNRTI_L2_NO2_PRODUCT_NITROGENDIOXIDE_TROPOSPHERIC_COLUMN_4326_0035"

format = "&format=image/png"
colortable = "&colortable=GMT_ocean"
size = "&scale=1.5"
number = 0
nodata = "&nodata=-9999"
min = 0.000001
max = 0.00019
colorrange = "&colorrange=(" + str(min) +"," + str(max)+")"

polygon = "\'geometry=MULTIPOLYGON (((10.4544285 47.5557972,10.4313005 47.5037634,10.4679703 47.4771102,10.4759458 47.4322233,10.4374211 47.412688,10.4367645 47.3803634,10.39473 47.3756053,10.3303332 47.3048155,10.2323489 47.2705193,10.172077 47.2790762,10.2159718 47.311064,10.1995092 47.3264601,10.2361856 47.3819213,10.181849 47.3924258,10.099812 47.3547862,10.0691405 47.410176,10.1055856 47.4287167,10.091638 47.4589276,10.0447745 47.4876222,10.0007641 47.4821056,9.965262 47.5208928,9.9704798 47.5458589,9.9218947 47.5296364,9.8812471 47.5481426,9.8745052 47.5285372,9.8157872 47.5476661,9.8272819 47.579972,9.7999863 47.5961014,9.7655314 47.5891166,9.7347836 47.5339558,9.550566 47.5371757,9.5951426 47.4633095,9.6589756 47.4522045,9.6444766 47.4336636,9.6740824 47.3901488,9.5307487 47.270581,9.5848953 47.2053468,9.5646263 47.1702461,9.6350038 47.1280857,9.6335324 47.0834247,9.6070544 47.0607725,9.8774876 47.0206984,9.8923039 46.9903589,9.8761296 46.9346278,10.0178184 46.9016148,10.1054563 46.8408629,10.2326652 46.8662925,10.2405831 46.9313701,10.3160518 46.9251765,10.3077409 46.9472666,10.3465112 46.9895904,10.3893298 47.0005271,10.426142 46.957465,10.4893516 46.9377888,10.4696542 46.8549127,10.5461739 46.8372666,10.6673729 46.875489,10.7634557 46.8235473,10.7300926 46.7884308,10.7863031 46.7963176,10.8828889 46.7628477,11.0247462 46.7664192,11.0390546 46.804867,11.0834154 46.8225084,11.071446 46.8534149,11.0959354 46.9118946,11.164008 46.9398441,11.1644228 46.9658088,11.3205028 46.9923713,11.4056015 46.9648126,11.4787673 47.0109803,11.5385291 46.9840796,11.6272122 47.0133024,11.7470355 46.9688703,11.916676 47.0331778,12.1859595 47.0921462,12.2407453 47.0691684,12.2047171 47.0268803,12.1213381 47.0070074,12.1319184 46.9623199,12.1686794 46.9372986,12.1438076 46.9137855,12.1903478 46.906115,12.2154096 46.8740062,12.2736729 46.8844102,12.3067711 46.841237,12.2839292 46.7829282,12.3574265 46.7749645,12.3840617 46.7163357,12.5612594 46.6525103,12.7759404 46.646697,12.852714 46.6046143,13.0837421 46.6020568,13.23979 46.5517007,13.3205735 46.5512327,13.3722404 46.5792771,13.7944625 46.5053395,13.9120536 46.5211288,14.006498 46.4813609,14.1215201 46.4766104,14.1633006 46.4336038,14.4296063 46.4470427,14.4788124 46.4134938,14.5217621 46.4272596,14.5634891 46.3722761,14.5959725 46.4368202,14.6993946 46.4636876,14.7147636 46.4999596,14.8186088 46.5093839,14.8704007 46.6072185,14.9195671 46.6020793,14.9556123 46.6327083,14.979315 46.6013979,15.0410367 46.6517696,15.4140706 46.655544,15.4620994 46.6152547,15.5022692 46.6139078,15.5498331 46.638486,15.5436841 46.6692925,15.595118 46.6900134,15.8396929 46.7223886,16.038092 46.656139,16.0298175 46.7116107,15.9847829 46.7519612,15.991012 46.8328265,16.1329128 46.8755739,16.1999018 46.9418014,16.2764695 46.9626082,16.2900942 47.0139621,16.5123192 47.0015538,16.4388931 47.0297151,16.5205586 47.0562139,16.4633499 47.0949728,16.5293432 47.1272428,16.5167749 47.1493285,16.4542982 47.1422966,16.4548076 47.1875562,16.4195013 47.1949147,16.4317923 47.2529443,16.4671339 47.2528991,16.4894219 47.2802867,16.4337372 47.3528684,16.4613539 47.3832964,16.4454594 47.4072159,16.4965697 47.3890498,16.51691 47.4105996,16.5757354 47.4063586,16.6620322 47.4557137,16.6523387 47.5003255,16.7145237 47.5399337,16.6645567 47.5662605,16.6731434 47.6049581,16.6520457 47.6229095,16.572515 47.6198261,16.4215332 47.6653098,16.4473224 47.6963055,16.4746589 47.6812582,16.5411146 47.712159,16.54798 47.751544,16.6091111 47.7603722,16.7209405 47.7353565,16.7490318 47.6814114,16.8283582 47.682744,16.8669133 47.7216587,16.8752019 47.6883314,17.093089 47.7082609,17.0509772 47.7939831,17.0744337 47.8082742,17.0099539 47.8583609,17.0851896 47.8744352,17.1126812 47.9273376,17.0909057 47.934408,17.1170151 47.9608948,17.094657 47.9708775,17.160776 48.006657,17.067423 48.031428,17.0927073 48.0996453,17.057195 48.143724,16.976246 48.1721385,16.946121 48.235881,16.957066 48.263818,16.9075325 48.288423,16.908545 48.32619,16.842703 48.352398,16.8332771 48.3812693,16.8637505 48.4193435,16.850008 48.449159,16.953933 48.54326,16.9020206 48.717973,16.800342 48.7059047,16.7247421 48.7380306,16.6825838 48.7277997,16.6637471 48.7810066,16.5934928 48.7826871,16.5407301 48.8142868,16.4604164 48.809046,16.3779962 48.7284701,16.0939298 48.7466758,15.9943344 48.779255,15.9496414 48.8052515,15.9583855 48.8230639,15.8932409 48.8346328,15.8415432 48.8771245,15.6896534 48.855685,15.6124081 48.8982463,15.5132636 48.9141699,15.4684865 48.9518232,15.2788803 48.9946571,15.2616104 48.9536427,15.1603169 48.9417712,15.1562723 48.9932908,15.020544 49.0205294,14.9904461 49.0096485,14.9761704 48.9709618,14.9929495 48.9041713,14.9532548 48.789786,14.9795018 48.7722601,14.9557928 48.7580851,14.808658 48.7788017,14.8081309 48.7338836,14.7269676 48.6870691,14.701529 48.582692,14.663459 48.5819589,14.6104495 48.6280986,14.5620556 48.603331,14.5032897 48.6173687,14.4698709 48.6484941,14.4437609 48.6434318,14.4560484 48.6251414,14.4314244 48.5891265,14.3862379 48.5926674,14.3880862 48.5718755,14.3332353 48.5518083,14.2715421 48.581372,14.066961 48.5948638,14.0105612 48.6396524,14.0594681 48.673826,13.843226 48.7725646,13.7948787 48.7150361,13.8374192 48.7005462,13.8134888 48.6918328,13.8257897 48.6185762,13.8009246 48.5735989,13.7540684 48.5635717,13.730512 48.5147674,13.5089626 48.5905995,13.4753731 48.5560605,13.4378394 48.5574418,13.4581768 48.5119092,13.4269976 48.456641,13.4393132 48.4308398,13.4113572 48.3747104,13.329798 48.3235141,13.0216802 48.2578178,12.9561334 48.209281,12.8700508 48.2013101,12.7869191 48.1237109,12.7589665 48.1269882,12.7594809 48.0751672,12.8502052 48.016211,12.8739101 47.9639227,12.938171 47.9432828,13.0036153 47.8493221,12.9052681 47.7234383,12.9738047 47.7071526,13.0183382 47.7228752,13.0807484 47.6870338,13.0989358 47.6351717,13.0706416 47.586978,13.0436523 47.5833636,13.0476465 47.4921627,13.0036669 47.4633962,12.7943155 47.5570041,12.7791497 47.5791416,12.8244836 47.6121071,12.7585755 47.6515501,12.7811652 47.6738182,12.6073437 47.6737269,12.5750269 47.6323152,12.4991695 47.6251006,12.4400708 47.6952305,12.2552499 47.6794511,12.2570286 47.7430345,12.1624246 47.701167,12.2039614 47.6067646,12.0085326 47.6251781,11.8549553 47.6023579,11.8440415 47.5812118,11.6361799 47.5945549,11.6057627 47.5810794,11.5724166 47.5145064,11.44209 47.517917,11.3838429 47.4723745,11.4211938 47.4445915,11.3386129 47.4499229,11.2698847 47.3975653,11.2249594 47.3952524,11.2534161 47.4282377,11.2069902 47.4339396,11.114824 47.3954556,10.9718964 47.3995575,10.9836122 47.4300177,10.9371742 47.4811371,10.8700396 47.483255,10.918007 47.5136312,10.890311 47.5373142,10.777508 47.5139211,10.6910027 47.5587703,10.5979477 47.5697413,10.5711058 47.5334723,10.4544285 47.5557972)),((10.4544285 47.5557972,10.4707128 47.5797253,10.4820072 47.584485,10.428999 47.5776114,10.4544285 47.5557972)))\'"
location = os.path.dirname(os.path.realpath(__file__))


def create_colorbar():  
    fg_color = 'white'
    bg_color = '#0a3138'

    fig, ax = plt.subplots(figsize=(6, 0.3))
    fig.subplots_adjust(bottom=0.5)
    cmap = cmaps.GMT_ocean
    norm = mpl.colors.Normalize(vmin=min, vmax=max)
    fig.patch.set_facecolor(bg_color)

    cb1 = mpl.colorbar.ColorbarBase(ax, cmap=cmap,
                                    norm=norm,
                                    orientation='horizontal')
    v = np.linspace(min, max, 3,endpoint=True)
    cb1.set_ticks(v)
    cb1.ax.xaxis.set_tick_params(color=fg_color)
    cb1.ax.set_ylabel('[mol/m2]', color=fg_color, rotation=0, labelpad=-168, y=1.2)
    ax.tick_params(color=fg_color, labelcolor=fg_color)
    cb1.outline.set_edgecolor(fg_color)   

    plt.savefig(location+'/legend.png',bbox_inches='tight', facecolor=bg_color, edgecolor=fg_color)


def get_timestamps(what_day):
    date_start =  datetime.datetime.now() - datetime.timedelta(days = what_day)
    return {
        'begin': create_start_date(date_start),
        'end': create_end_date(date_start),
        'name': location +"/day_" + str(number) + ".png"
    }

def create_start_date(date):
    return int(date.replace(hour=1, minute=00, second=0, microsecond=0).timestamp())

def create_end_date(date):
    date = date + datetime.timedelta(days = 7)
    return int(date.replace(hour=0, minute=59, second=0, microsecond=0).timestamp())

def get_url(day):
    subset_time = create_time_subset(day['begin'], day ['end'])
    return  get_base() + subset_time + get_format()

def get_format():
    return format + colortable + size + coverage_id + nodata + colorrange

def get_base():
    return base_url + service_url

def create_time_subset(begin, end):
    return "&subset=t(" + str(begin) + "," + str(end) + ")" 


def getImage(url, name):
    cmd = 'wget -O ' + name + ' --post-data=' + polygon + " '" + url +"'"
    print(cmd)
    subprocess.call(cmd, shell=True)

number= number+1
day1 = get_timestamps(7)
number= number+1
day2 = get_timestamps(14)
number= number+1
day3 = get_timestamps(21)

getImage(get_url(day1), day1["name"])
getImage(get_url(day2), day2["name"])
getImage(get_url(day3), day3["name"])
create_colorbar()