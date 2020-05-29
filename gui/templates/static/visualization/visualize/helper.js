function addSpecialRows()
{
    specialRows.forEach(function(row)
    {
        orderedDataTable[row.orderInTable] = "<td colspan=\"3\" id="+ row.orderInTable +"><b>"+ row.name + "</b></td>";
    });
    
}

function isDateNotValid(d) 
{
    try{
        var d = new Date(d);
        return !(d.getTime() === d.getTime()); //NAN is the only type which is not equal to itself.
    }catch (e){
        return true;
    }

}


function createServerURL(server)
{
    return server.adress + service;
}

function getCoverageID(data)
{
    return data.getElementsByTagName("CoverageId")[0].textContent;
}

function checkForDataset(id, serverdatasets)
{
    var useddatasetID = null;
    serverdatasets.forEach(function(datasetID)
    {
        var data = Datasets[datasetID]
        if(data.coverageid === id)
        {
            useddatasetID = datasetID
        }
    });
    return useddatasetID
}

function getDatasetByCoverageID(id, serverdatasets)
{
    return Datasets[checkForDataset(id, serverdatasets)];
}

function serverHasDatasetwithCoverageID(id, serverdatasets)
{
    return checkForDataset(id, serverdatasets)==null?false:true;
}

function calcVolumefromData(days, product)
{
    return days*product.volume;
}


function createDiv(divData)
{
    //var string = "<div class=\"showtimeTableInformation\" style=\"display: none; margin-top:"+ MARGIN +"px;\"id=\"info-to-id-" + divData.id + "\">" + divData.name + "<\div>";
    //MARGIN = MARGIN  + SPACE;
    var string = "<div class=\"showtimeTableInformation\" style=\"display: none;\" id=\"info-to-id-" + divData.id + "\">" + divData.name + "<\div>";
    return string;
}

function addToDataTable(row, id, info)
{
    orderedDataTable[id] = row;
    orderedDataTableForDIV[id] = {name : info,
                                        id: id};
}

function getOrderID(product)
{
    return product.id;
}

function calcDateDifference(dateString1, dateString2)
{
    date1 = new Date( dateString1 );
    date2 = new Date( dateString2 );
    var res = Math.abs(date1 - date2) / 1000;
    return Math.floor(res / 86400);
}

function getStartdate(data)
{
    return createDateFromCorner(getLowerCorner(data));
}

function getEnddate(data)
{
    return createDateFromCorner(getUpperCorner(data));
}

function createRow(name, start, end, id)
{
    return "<tr class=\"timetableTags\" id="+ id +"><td>" + name + "</td><td>" + start + "</td><td>" + end + "</td></tr>";
}

function getInformation(product)
{
    return product.name;
}

function getName(product)
{
    return product.simplename;
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
  console.log(box); 
  var split = box.split(" ");
  console.log(split);
  return beautifyDate(new Date(split[2] * 1000));
}

function beautifyDate(date)
{
    return date.toISOString().split("T")[0];
}
