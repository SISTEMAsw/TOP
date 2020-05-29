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
    loadFileCAMS('/static/visualization/downloadData/plots/cams.json')
    loadFileSP5('/static/visualization/downloadData/plots/cams_sp5.json')
}

createPlots();
