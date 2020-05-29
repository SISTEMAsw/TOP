function drawDonut()
{
    var options = {
        theme: {
            /*monochrome: {
              enabled: true,
              color: '#B2B2B2',
              shadeTo: 'light',
              shadeIntensity: 0.65
            }*/
            palette: 'palette2'
        },
        chart: {
            type: 'donut',
        },
        series: [100],
        labels: ['Atmosphere'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                    legend: {
                        position: 'bottom'
                    }
            }
        }],
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        value: {
                            formatter: function (value) {
                                return 100 + " %";
                            }
                        }
                    }
                }
            }
        }
     };


    var chart = new ApexCharts(
        document.querySelector("#chartContainerDomain"),
        options
    );

    chart.render();

}
