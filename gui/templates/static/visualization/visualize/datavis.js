
function drawPlotSP5(data)
{

    for(var i = 0; i < data[1].data.size; i++)
    {
        if(data[1].data[i] == 'null')
        {
            data[1].data[i] = null;
            data[2].data[i] = null;
        }
     }
    var options = {
        chart: {
            height: 350,
            type: 'line',
            shadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1
            },
            foreColor: '#fff',
            toolbar: {
                show: false
            }
        },
        
        dataLabels: {
            enabled: false,
            formatter: function (value) {
                return value.toExponential(3);
              }
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
                name: "CAMS",
                data: data[0].data
            },
           // {
           //     name: "SP5",
           //     data: data[1].data
           // }
        ],
        title: {
            text: 'CAMS Global NO2 total column forecast vs. Sentinel 5P NO2 troposheric column',
            align: 'center',
            fontSize: '1.17em'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            
            size: 6
        },
        xaxis: {
            categories: data[2].data,
            title: {
                text: 'Day'
            }
        },
        yaxis: {
            title: {
                text: 'kg/m2'
            },
            forceNiceScale: true,
            labels: {
		    formatter: function (value) {
			return value.toExponential(3);
                     }
              },

        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    }
        var chart4 = new ApexCharts(
        document.querySelector("#chartSP5Plot"),
        options
    );

    chart4.render();

}         



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

function loadFileCAMS(filePath) {
    var jqxhr = $.getJSON( filePath, function() {
        //console.log( "success" );
      })
        .done(function(data) {
          //console.log( "second success" );

            drawPlot(data);                
        });
  }

  function loadFileSP5(filePath) {
    var jqxhr = $.getJSON( filePath, function() {
        //console.log( "success" );
      })
        .done(function(data) {
         // console.log( "second success" );
    
            drawPlotSP5(data);                
        });
  }


function createPlots()
{
    loadFileCAMS('/static/visualization/plots/cams.json')
    loadFileSP5('/static/visualization/plots/cams_sp5.json')
}

createPlots();
