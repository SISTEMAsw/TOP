
function getCoverageSummary(data) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    var CoverageSummary = xmlDoc.getElementsByTagName("CoverageSummary");
    return CoverageSummary;
}

function beautifyDate(date)
{
    return date.toISOString().split("T")[0];
}

function getUpperCorner(data)
{
    return data.getElementsByTagName("upperCorner")[0].textContent;
}

function getLowerCorner(data)
{
    return data.getElementsByTagName("lowerCorner")[0].textContent;
}

function createDateFromCorner(box)
{
  var split = box.split(" ");
  return beautifyDate(new Date(split[2] * 1000));
}

function getStartdate(data)
{
    return createDateFromCorner(getLowerCorner(data));
}

function getEnddate(data)
{
    return createDateFromCorner(getUpperCorner(data));
}

function createDataForDatasetWithCoverageID(serverDataset, ds)
{
  var coverageIDFromServer = serverDataset.getElementsByTagName("CoverageId")[0].textContent;
  if (coverageIDFromServer.startsWith(ds.coverageid))
  {
    ds.start = getStartdate(serverDataset);
    ds.end = getEnddate(serverDataset);
  }
}

function createDataForDatasetWithDifferentDates(serverDataset, ds)
{
  var coverageIDFromServer = serverDataset.getElementsByTagName("CoverageId")[0].textContent;

  if (coverageIDFromServer.startsWith(ds.coverageStart))
  {
    ds.start = getStartdate(serverDataset);
  }
  else if (coverageIDFromServer.startsWith(ds.coverageEnd))
  {
    ds.end = getEnddate(serverDataset);
  }
  else if (!ds.hasOwnProperty("start") && coverageIDFromServer.startsWith(ds.coverageFallBack) )
  {
    ds.start = getStartdate(serverDataset);
  }

}

function getDataset(data)
{
    for (var i = 0; i < data.length; i++)
    {
        var serverDataset = data[i];

        Datasets.forEach((ds, i) => {
          if(ds.hasOwnProperty("coverageid"))
          {
            createDataForDatasetWithCoverageID(serverDataset, ds);
          }
          else if(ds.hasOwnProperty("coverageStart"))
          {
              createDataForDatasetWithDifferentDates(serverDataset, ds);
          }

        });
    }
    Datasets.forEach(function(ds)
    {
        createRow(ds);
    });
    addGroundData();
    $('#LoaderOption').css("display", "none");
    $('#dataContainer').show();

}

function createServerURL()
{
    return server + service;
}

function formatGround(data)
{
    return"<div class=\"dsRow\">" + createNameDiv(data.product) + createStartDiv(data.start.split('T')[0]) + createEndDiv(data.end.split('T')[0]) +"</div>"
}


function addGroundData()
{
    $.get( "http://top-platform.eu/portal/ground/", function( data ) {

        for(var i=0; i < data.length; i++)
        {
                addRow(formatGround(data[i]));
        }
      });
}


function getServerData()
{

    var request = new XMLHttpRequest();
    var url = createServerURL();
    request.timeout = 8000;
    request.open('GET', url, true);
    request.onload = function ()
    {
        getDataset(getCoverageSummary(this.response));
    }
    request.send();

}
