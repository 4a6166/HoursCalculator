
const billableYearMonthPicker = document.querySelector('.billableYearMonth');
const picker = $("#billableYearMonth");
billableYearMonthPicker.addEventListener('change', updateTableEvent);

function updateTableEvent(e) {
    updateTable();
}

function updateTable() {
    let table = $('#hrsTable tbody tr');
    console.log(table);
    
    let month = $("#billableYearMonth").find(":selected").val();
    console.log(month);

    for (let i = 0; i < table.length; i++){
        let row = table[i].children[0];

        let num = Number(month) +i;
        if (num > 12) {
            num -= 12;
        }
        console.log(switchMonthNumToString(num));
        row.innerHTML = "<td>"+(switchMonthNumToString(num))+"</td>";
        
    }
}


function switchMonthNumToString(number){
    switch (number) {
        case 1:
            return "January";
            break;
        case 2:
            return "February";
            break;
        case 3:
            return "March";
            break;
        case 4:
            return "April";
            break;
        case 5:
            return "May";
            break;
        case 6:
            return "June";
            break;
        case 7:
            return "July";
            break;
        case 8:
            return "August";
            break;
        case 9:
            return "September";
            break;
        case 10:
            return "October";
            break;
        case 11:
            return "November";
            break;
        case 12:
            return "December";
            break;
    }
}



function setYear(){
    let y = new Date().getFullYear().toString();
    picker.find(":selected").prop("selected", false)
}

function monthsRemaining(startMonth, currentMonth)
{
    let result = 0;

    if (startMonth === currentMonth){
        result = 12;
    } else if(startMonth > currentMonth) {
        result = Number(startMonth - currentMonth);
    } else {
        result = 12 - Number(currentMonth - startMonth)
    }

    console.log("Months Remaining: "+result);
    return result;
}

function getHours(className) {
    let result = 0;
    let cells = document.getElementsByClassName(className);

    for(let i = 0; i<cells.length; i++) {
        result += Number(cells[i].value);
    }
    console.log("Months with "+className+" hours: "+cells.length);
    let remaining ="";
    for (let i = 1; i < className.length; i++){
        remaining += className[i];
    }
    console.log(className[0].toUpperCase() + remaining +" Hours Found: "+result);
    return result;
}

function calcHours() {
    // get billable hour requirement
    let billableHoursReq = $("#BillHrReq").val();
    // get pro bono and other non-billable hours counting towards billable max
    let proBonoHoursMax = $("#PBHrs").val();
    // get month that starts the billable year
    // let startMonth = Number($("#billableYearMonth").val().split("-")[1]);
    let startMonth = $("#billableYearMonth").find(":selected").val();
    console.log("Billable Year Start Month: "+startMonth);

    //get array of billable hours for each month
    let billableHrsSum = getHours("billable");
    let hrsLeftPerMonth = 0;
    //get array of PB hours for each month
    let proBonoHrsSum = getHours("probono");

    //result variables
    let billableHrsRemaining = 0;
    let proBonoHoursRemaining = (proBonoHrsSum <= proBonoHoursMax) ? (Number(proBonoHoursMax) - Number(proBonoHrsSum)) : 0;

    let date = new Date();
    let currentMonth = date.getMonth()+1;
    console.log("Current Month: " +currentMonth);
    let monthsLeft = monthsRemaining(startMonth, currentMonth)
    

    if(billableHoursReq == 0){
        alert("Please enter the Annual Billable Hours Requirement.")
    } else { 
        if (proBonoHoursRemaining > 0){
            billableHrsRemaining = Number(billableHoursReq) - (Number(billableHrsSum) + Number(proBonoHrsSum));
        } else {
            billableHrsRemaining = Number(billableHoursReq) - (Number(billableHrsSum) + Number(proBonoHoursMax));
        }

        if (billableHrsRemaining >0){
            hrsLeftPerMonth = Math.ceil(billableHrsRemaining / monthsLeft);
        } else {
            hrsLeftPerMonth = 0;
        }
        
        console.log("Total Billable Hours Remaining: "+ billableHrsRemaining);
        console.log("Pro Bono/Other Hours Left Available: "+proBonoHoursRemaining);
        console.log("Hours Remaining Per Month: "+hrsLeftPerMonth);

        updateResults(monthsLeft, billableHrsRemaining, proBonoHoursRemaining, hrsLeftPerMonth);
    }
}

function updateResults(monthsLeft, hoursLeft, hoursLeftPB, hoursLeftMonth) {
    let months = $("#monthsLeft").text(monthsLeft);
    let hrs = $("#hrsLeftBillable").text(hoursLeft);
    let hrsPB = $("#hrsLeftProBono").text(hoursLeftPB);
    let hrsMonth = $("#hrsLeftPerMonth").text(hoursLeftMonth);
}

function resetFields(){
    $("#BillHrReq").val(null);
    $("#PBHrs").val(null);
    setYear();


    let cellsBill = document.getElementsByClassName("billable");
    for (let i = 0; i<cellsBill.length; i++)
    {
        cellsBill[i].value = null;
    }

    let cellsPB = document.getElementsByClassName("probono");
    for (let i = 0; i<cellsPB.length; i++)
    {
        cellsPB[i].value = null;
    }

    updateResults(0, 0, 0, 0)
    updateTable();
}

(function (){
    setYear();
    updateTable();
})()