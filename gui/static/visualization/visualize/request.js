function today(){
    return createDate(1);
};

function day1(){
    return createDate(7);
};

function day2(){
    return createDate(14);
};

function day3(){
    return createDate(21);
};

function createDate(day)
{
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - day);
    return formatDate(yesterday);
}

function formatDate(date)
{
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    }
    if (mm < 10) {
    mm = '0' + mm;
    }
    return dd + '.' + mm + '.' + yyyy;
    //return date.toISOString().split('T')[0];
}
