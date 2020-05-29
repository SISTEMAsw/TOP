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
