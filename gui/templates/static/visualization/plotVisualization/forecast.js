function drawPlot(data)
{
    var dates = [];

    for(var i = 0; i < data[0].data.length; i++)
    {
        var value = parseFloat(data[0].data[i]);
        var tmpArray = [new Date(data[1].data[i]), value];
        dates.push(tmpArray);
    }

    var options = {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true
          },
          foreColor: '#fff',
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        series: [{
            name: 'CAMS forecast',
          data: dates
        }],
        markers: {
          size: 0,
        },
        title: {
          text: 'CAMS EU regional PM10 surface',
          align: 'center',
          fontSize: '1.17em',
          fontFamily: 'topFont'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
          },
        },
        yaxis: {
          title: {
            text: 'µg/m3'
          },
          labels: {
            formatter: function (value) {
		//return value.toExponential(1);
		   return value.toFixed(1);
            }
          },
        },
        xaxis: {
          type: 'datetime',
        },
  
        tooltip: {
          shared: false,
          x: {
            show: true,
            format: 'dd MMM - HH:mm',
            formatter: undefined,
        }
        }
      }


      var chart3 = new ApexCharts(
        document.querySelector("#chartPlot"),
        options
      );

      chart3.render();
}
