console.log('Hours Calculator loaded');

let data = {
    hoursRequirement: undefined,
    hoursAllowableProBono: undefined,
    startMonth: undefined,

    hours: {
        billable: [],
        proBono: [],
    }
};

let calcs = {
    monthsRemaining: undefined,
    hrsLeft_Total: undefined,
    hrsLeft_ProBono: undefined,
    hrsLeft_PerMonth: undefined,
};

const hoursRequirement = document.getElementById('BillHrReq');
hoursRequirement.addEventListener('change', _updateData);

const hoursAllowableProBono = document.getElementById('PBHrs');
hoursAllowableProBono.addEventListener('change', _updateData);

const billableYearMonthPicker = document.getElementById('billableYearMonth');
billableYearMonthPicker.addEventListener('change', _updateData);


const table = document.getElementById('hrsTable');
const tableRows = table.children[1].children;
table.addEventListener('change', _updateData);


const monthsRemaining1 = document.getElementById('monthsLeft');
const hoursRemaining = document.getElementById('hrsLeftBillable');
const hrsLeftProBono = document.getElementById('hrsLeftProBono');
const hrsLeftPerMonth = document.getElementById('hrsLeftPerMonth');

function _updateData(e){
    console.log("setting local storage");
    updateData();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
}

function updateData(){
    data.hoursRequirement = hoursRequirement.value;
    data.hoursAllowableProBono = hoursAllowableProBono.value;
    data.startMonth = billableYearMonthPicker.value;

    data.hours.billable = [];
    data.hours.proBono =    [];
    for (let i = 0; i<12; i++){
        console.log("billable: "+tableRows[i].children[1].children[0].value)
        data.hours.billable.push(tableRows[i].children[1].children[0].value);
        data.hours.proBono.push(tableRows[i].children[1].children[0].value);
    }
}

(function onLoad(){
    if(localStorage.getItem("hrsCalculator")){
        console.log(localStorage.getItem("hrsCalculator"));
        data = JSON.parse(localStorage.getItem("hrsCalculator"));
        
        hoursRequirement.value = data.hoursRequirement;
        hoursAllowableProBono.value = data.hoursAllowableProBono;
        billableYearMonthPicker.value = data.startMonth;

        for( let i = 0; i < tableRows.length; i++){
            tableRows[i].children[1].children[0].value = data.hours.billable[i];
            tableRows[i].children[2].children[0].value = data.hours.proBono[i];            
        }

        monthsRemaining1.value = calcs.monthsRemaining;
        hoursRemaining.value = calcs.hrsLeft_Total;
        hrsLeftProBono.value = calcs.hrsLeft_ProBono;
        hrsLeftPerMonth.value = calcs.hrsLeft_PerMonth
    }
})();





// //TODO: Fill data and calcs objects, load data from local storage on startup, save on update, have functions fill calcs and have display pull from it

// const picker = $("#billableYearMonth");

// const annualBillReq = document.querySelector('#BillHrReq');
// annualBillReq.addEventListener('change', updateTableEvent);

// const otherHrs = document.querySelector('#PBHrs');
// otherHrs.addEventListener('change', updateTableEvent);

// function updateTableEvent(e) { 
//     // updateTable();
//     // setLocalStorage();
// }

// function setLocalStorage(){
//     let billableYearMonth = $("#billableYearMonth").find(":selected").val();
//     localStorage.setItem("billableYearMonth", billableYearMonth);

//     let annualBillReq = $("#BillHrReq").val();
//     localStorage.setItem("annualBillReq", annualBillReq);

//     let otherHrs = $("#PBHrs").val();
//     localStorage.setItem("otherHrs", otherHrs);

//     // TODO: get/set local storage for all items in the table
// }

// function getFromLocalStorage(){
//     let annualBillReq = Number(localStorage.getItem("annualBillReq"));
//     let annualBillReqInput = $("#BillHrReq");
//     if(annualBillReq > 0){
//         annualBillReqInput.val(annualBillReq);
//     } else annualBillReqInput.val(undefined)

//     let otherHrs = Number(localStorage.getItem("otherHrs"));
//     let otherHrsInput = $("#PBHrs");
//     if(otherHrs > 0){
//         otherHrsInput.val(otherHrs);
//     } else otherHrsInput.val(undefined);

//     let localMonthNum = localStorage.getItem("billableYearMonth");
//     let localMonth = switchMonthNumToString(Number(localMonthNum));
//     let sel = picker.find(`:contains(${localMonth})`);
//     sel.prop("selected", true);
// }

// function updateTable() {
//     let table = $('#hrsTable tbody tr');
//     // console.log(table);
    
//     let month = $("#billableYearMonth").find(":selected").val();
//     // console.log(month);

//     for (let i = 0; i < table.length; i++){
//         let row = table[i].children[0];

//         let num = Number(month) +i;
//         if (num > 12) {
//             num -= 12;
//         }
//         // console.log(switchMonthNumToString(num));
//         row.innerHTML = "<td>"+(switchMonthNumToString(num))+"</td>";
        
//     }
// }


// function switchMonthNumToString(number){
//     switch (number) {
//         case 1:
//             return "January";
//             break;
//         case 2:
//             return "February";
//             break;
//         case 3:
//             return "March";
//             break;
//         case 4:
//             return "April";
//             break;
//         case 5:
//             return "May";
//             break;
//         case 6:
//             return "June";
//             break;
//         case 7:
//             return "July";
//             break;
//         case 8:
//             return "August";
//             break;
//         case 9:
//             return "September";
//             break;
//         case 10:
//             return "October";
//             break;
//         case 11:
//             return "November";
//             break;
//         case 12:
//             return "December";
//             break;
//     }
// }

// function switchMonthStringToNum(string){
//     switch (string) {
//         case "January":
//             return 1;
//             break;
//         case "February":
//             return 2;
//             break;
//         case "March":
//             return 3;
//             break;
//         case "April":
//             return 4;
//             break;
//         case "May":
//             return 5;
//             break;
//         case "June":
//             return 6;
//             break;
//         case "July":
//             return 7;
//             break;
//         case "August":
//             return 8;
//             break;
//         case "September":
//             return 9;
//             break;
//         case "October":
//             return 10;
//             break;
//         case "November":
//             return 11;
//             break;
//         case "December":
//             return 12;
//             break;
//     }
// }


// function setYear(){
//     let y = new Date().getFullYear().toString();
//     picker.find(":selected").prop("selected", false)
// }

// function monthsRemaining(startMonth, currentMonth)
// {
//     let result = 0;

//     if (startMonth === currentMonth){
//         result = 12;
//     } else if(startMonth > currentMonth) {
//         result = Number(startMonth - currentMonth);
//     } else {
//         result = 12 - Number(currentMonth - startMonth)
//     }

//     console.log("Months Remaining: "+result);
//     return result;
// }

// function getHours(className) {
//     let result = 0;
//     let cells = document.getElementsByClassName(className);

//     for(let i = 0; i<cells.length; i++) {
//         result += Number(cells[i].value);
//     }
//     console.log("Months with "+className+" hours: "+cells.length);
//     let remaining ="";
//     for (let i = 1; i < className.length; i++){
//         remaining += className[i];
//     }
//     console.log(className[0].toUpperCase() + remaining +" Hours Found: "+result);
//     return result;
// }

// function calcHours() {    
//     // get billable hour requirement
//     let billableHoursReq = $("#BillHrReq").val();
//     // get pro bono and other non-billable hours counting towards billable max
//     let proBonoHoursMax = $("#PBHrs").val();
//     // get month that starts the billable year
//     // let startMonth = Number($("#billableYearMonth").val().split("-")[1]);
//     let startMonth = $("#billableYearMonth").find(":selected").val();
//     console.log("Billable Year Start Month: "+startMonth);

//     //get array of billable hours for each month
//     let billableHrsSum = getHours("billable");
//     let hrsLeftPerMonth = 0;
//     //get array of PB hours for each month
//     let proBonoHrsSum = getHours("probono");

//     //result variables
//     let billableHrsRemaining = 0;
//     let proBonoHoursRemaining = (proBonoHrsSum <= proBonoHoursMax) ? (Number(proBonoHoursMax) - Number(proBonoHrsSum)) : 0;

//     let date = new Date();
//     let currentMonth = date.getMonth()+1;
//     console.log("Current Month: " +currentMonth);
//     let monthsLeft = monthsRemaining(startMonth, currentMonth)
    

//     if(billableHoursReq == 0){
//         alert("Please enter the Annual Billable Hours Requirement.")
//     } else { 
//         if (proBonoHoursRemaining > 0){
//             billableHrsRemaining = Number(billableHoursReq) - (Number(billableHrsSum) + Number(proBonoHrsSum));
//         } else {
//             billableHrsRemaining = Number(billableHoursReq) - (Number(billableHrsSum) + Number(proBonoHoursMax));
//         }

//         if (billableHrsRemaining >0){
//             hrsLeftPerMonth = Math.ceil(billableHrsRemaining / monthsLeft);
//         } else {
//             hrsLeftPerMonth = 0;
//         }
        
//         console.log("Total Billable Hours Remaining: "+ billableHrsRemaining);
//         console.log("Pro Bono/Other Hours Left Available: "+proBonoHoursRemaining);
//         console.log("Hours Remaining Per Month: "+hrsLeftPerMonth);

//         updateResults(monthsLeft, billableHrsRemaining, proBonoHoursRemaining, hrsLeftPerMonth);
//     }
// }

// function updateResults(monthsLeft, hoursLeft, hoursLeftPB, hoursLeftMonth) {
//     let months = $("#monthsLeft").text(monthsLeft);
//     let hrs = $("#hrsLeftBillable").text(hoursLeft);
//     let hrsPB = $("#hrsLeftProBono").text(hoursLeftPB);
//     let hrsMonth = $("#hrsLeftPerMonth").text(hoursLeftMonth);
// }

// function resetFields(){
//     $("#BillHrReq").val(null);
//     $("#PBHrs").val(null);
//     setYear();


//     let cellsBill = document.getElementsByClassName("billable");
//     for (let i = 0; i<cellsBill.length; i++)
//     {
//         cellsBill[i].value = null;
//     }

//     let cellsPB = document.getElementsByClassName("probono");
//     for (let i = 0; i<cellsPB.length; i++)
//     {
//         cellsPB[i].value = null;
//     }

//     updateResults(0, 0, 0, 0)
//     updateTable();
// }





// (function (){
//     setYear();
//     getFromLocalStorage();
//     updateTable();
// })()