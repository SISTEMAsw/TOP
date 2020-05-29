function formatGround(data)
{
    return '<tr><td>'+data.product+'</td><td>'+data.start.split('T')[0]+'</td><td>'+data.end.split('T')[0]+'</td></tr>'
}

function addGround()
{
    
    $.get( "/portal/ground/", function( data ) {
        //$( ".result" ).html( data );
        for(var i=0; i < data.length; i++)
        {
            if(i === 0)
                $('#timelinetable td:last').after(formatGround(data[i]));
            else
                $('#timelinetable tr:last').after(formatGround(data[i]));
        }
      });   

    //var destination = $('#timelinetable').offset();
    $('#timetableInfoBox').css({top: -250});
}


// Draws the table
function drawTable()
{
    orderedDataTable.forEach(function(row)
    {
        $("table tbody").append(row); 
    });


    orderedDataTableForDIV.forEach(function(divData)
    {
        var div = createDiv(divData);
        $("#timetableInfoBox").append(div);
    });
    var pos = $("#DatatableContent").offset()
    $("#timetableInfoBox").offset(pos);
    $('.timetableTags').hover(
        function(){
            $("#info-to-id-"+this.id).show();
            var x = $("#"+this.id).position();
            $("#info-to-id-"+this.id).css({top: x.top + 50});
            
        }, 
        function(){
            $("#info-to-id-"+this.id).hide();
        } 
        );
    addGround();
}




function drawDonut(data_series, data_lables)
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
        series: data_series,
        labels: data_lables,
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

function drawTimeline(series, startDate, endDate)
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
            height: 370,
            width: 900,
            type: 'rangeBar',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        series: series,
        yaxis: {
          min: startDate.getTime(),
          max: endDate.getTime()
        },
        xaxis: {
           type: 'datetime'
        },
        
    }

   var chart2 = new ApexCharts(
        document.querySelector("#chartTimeline"),
        options
    );
    
    chart2.render();
}


