
// Tracks the Requests
var requestCount = 0;
var MARGIN = -900;
var SPACE = 38;



// Calculates the GB per Day for every product in the Dataset
function getGBperDay()
{   
    Datasets.forEach(function(data)
    {
        var vol = calcVolume(data);
        data.GBperDay = vol;
    });
}

function calcVolume(product)
{
    var coverage = product.coverage;
    var coverageDay = product.coverageDay;
    var resolution = product.resolution;
    var bitdepth = product.bitdepth;
    var bands = product.bands;
    var volume = (coverageDay/100)*coverage/resolution*bitdepth/Math.pow(1024,3)*bands;
    return volume;
}

function startRequests()
{         
    Servers.forEach(function(server)
    {
       RequestServerData(server);
    });
}

function RequestServerData(server)
{
    var request = new XMLHttpRequest();
    var url = createServerURL(server);
    request.timeout = 8000;
    request.open('GET', url, true);
    request.onload = function () 
    { 
        //console.log("url: " + url);
	//console.log(this.response);
        var coverageSummery = getCoverageSummary(this.response);
        //console.log(coverageSummery);
        getDatasetsFromServer(coverageSummery, server.hasDatasets);
        requestCount++;
        createVisualization();     
    }
    request.send(); 
}

function getCoverageSummary(data) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    var CoverageSummary = xmlDoc.getElementsByTagName("CoverageSummary");
    return CoverageSummary;
}

function getDatasetsFromServer(CoverageSummary, usedDatasets) {


    for (var i = 0; i < CoverageSummary.length; i++)
    {
        var id = getCoverageID(CoverageSummary[i]);
        console.log(id); 
        if(serverHasDatasetwithCoverageID(id, usedDatasets))
        {
            // Adds Start and End day, also the duration
            dataset = getDatasetByCoverageID(id, usedDatasets);
            console.log(dataset);
            console.log(CoverageSummary[i]);
            dataset.start = getStartdate(CoverageSummary[i]);           
            dataset.end = getEnddate(CoverageSummary[i]);
            
            dataset.days = calcDateDifference(dataset.start, dataset.end);
            //console.log(dataset.id + " " + id);

        }
    }
}

function createVisualization()
{
    if(requestCount == Servers.length)
    {
        $('#LoaderOption').css("display", "none");
        $('#dataContainer').show();
        createTable();
        drawTable();
        createChart();
        moveFooter();
        footer();
    }
}

function createTimelime()
{
    var all_start_dates = [];
    var all_end_dates = [];
    var series = [];
    domainNameIndex =[];
    Summery.forEach(function(collected)
    {
        var domainName = collected.domain;
        if(domainNameIndex.includes(domainName))
        {
            // If yes, get the index and add GB to the object
            var i = domainNameIndex.indexOf(domainName);
            
            collected.collectsDatasets.forEach(function(id)
            {
                var dataset = Datasets[id];
                var data = {
                    x: collected.name,
                    y: [new Date(dataset.start).getTime(), new Date(dataset.end).getTime()]
                }
                series[i].data.push(data);
                if(!isDateNotValid(dataset.start))
                { all_start_dates.push(new Date(dataset.start));}
                if(!isDateNotValid(dataset.end))
                { all_end_dates.push(new Date(dataset.end));}
            });

        }
        else
        {
            var series_data = {
                name : domainName,
                data: []
            };
            
            collected.collectsDatasets.forEach(function(id)
            {
                var dataset = Datasets[id];
                var data = {
                    x: collected.name,
                    y: [new Date(dataset.start).getTime(), new Date(dataset.end).getTime()]
                }
                series_data.data.push(data);
                if(!isDateNotValid(dataset.start))
                { all_start_dates.push(new Date(dataset.start));}
                if(!isDateNotValid(dataset.end))
                { all_end_dates.push(new Date(dataset.end));}
    
            });
            series.push(series_data);
            domainNameIndex.push(domainName);
        }
        
    });
    var startDate= new Date(Math.min.apply(null,all_start_dates));
    var endDate = new Date(Math.max.apply(null,all_end_dates));
    drawTimeline(series, startDate, endDate);
}


function createTable()
{
    Summery.forEach(function(collected)
    {
        var dates = [];
        collected.collectsDatasets.forEach(function(id)
        {
            // Get date and GB per dataset in Summary
            var dataset = Datasets[id];
            if (dataset.start != undefined)
                dates.push(new Date(dataset.start));
            if (dataset.end != undefined)
                dates.push(new Date(dataset.end));
            var vol = 0;
            if(dataset.days != undefined)
                vol = dataset.GBperDay * dataset.days;
            // Adds GB for every summary
            collected.GB = collected.GB + vol;
        });

        //console.log(collected.name);
        var startDate;
        var endDate;

        // Find Start and End Date
        if(dates.length != 0)
        {
            startDate= beautifyDate(new Date(Math.min.apply(null,dates)));
            endDate = beautifyDate(new Date(Math.max.apply(null,dates)));
            
        }
        else{
            startDate = beautifyDate(new Date());
            endDate = beautifyDate(new Date());
        }
        //console.log(startDate + " " + endDate);

        // Creates the rows for the Table
        var row = createRow(collected.name, startDate, endDate, collected.orderInTable);
        var info = collected.description;
        addToDataTable(row, collected.orderInTable, info);
        var div = createDiv(collected.orderInTable, info);
        $("#floatInfo").append(div);
    }
    );
}

function createChart()
{
    // Contains the data for the chart
    arrayForChart = [];

    // Contains all lables
    domainNameIndex =[];
    Summery.forEach(function(collected)
    {
        var domainName = collected.domain;
        var vol = collected.GB;

        // Check if lable was already used
        if(domainNameIndex.includes(domainName))
        {
            // If yes, get the index and add GB to the object
            var i = domainNameIndex.indexOf(domainName);
            arrayForChart[i].y = arrayForChart[i].y + vol;
            arrayForChart[i].y  = Math.ceil(arrayForChart[i].y);
        }
        else
        {
            // else create a new object
            arrayForChart.push(
                {   label : domainName,
                    y : vol, 
                }
            );
            domainNameIndex.push(domainName);
        }

    });


    data_series = [];
    data_lables = [];

    arrayForChart.forEach(function(entry) {
        data_series.push(entry.y);
        data_lables.push(entry.label);
    });

    drawDonut(data_series, data_lables);
}

