function createHeaderRow(ds)
{
    return "<div class=\"headerRow\"><b>"+ ds.name + "</b></div>"
}


function createNameDiv(name)
{
    return "<div class=\"dsName\">"+ name + "</div>"
}

function createStartDiv(start)
{
    return "<div class=\"dsStart\">"+ start +"</div>"
}

function createEndDiv(end)
{
    return "<div class=\"dsEnd\">"+ end +"</div>"
}

function createOverlayDiv(orderInTable, description)
{
    return "<div class=\"overlay\" id=\"overlay-"+ orderInTable +"\">" + description +"</div>"
}

function createDataRow(ds)
{
    if(!ds.hasOwnProperty("start"))
    {
      ds.start = "ERROR";
    }
    if(!ds.hasOwnProperty("end"))
    {
      ds.end = "ERROR";
    }
    return "<div class=\"dsRow\" id=\""+ ds.orderInTable+"\">" + createNameDiv(ds.name) + createStartDiv(ds.start) + createEndDiv(ds.end) + createOverlayDiv(ds.orderInTable, ds.description) + "</div>"
}

function addRow(row)
{
    $("#DataTable").append(row);
}

function createRow(ds)
{
    if(ds.hasOwnProperty("description"))
    {
        addRow(createDataRow(ds));
    }
    else
    {
        addRow(createHeaderRow(ds));
    }
}

function createTable()
{
    $('#dataContainer').hide();
    drawDonut();
    getServerData();
}
