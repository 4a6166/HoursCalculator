console.log('Hours Calculator loaded');

// let reasonableBaseline = {
//     hrsRequirement: 2100,
//     hrsProBono: 30,
//     startMonth: Jan,
//     hrsPerMo: {
//         low: 180,
//         high: 200,
//     }
// }

function changeVisibility(elementId, buttonID){
    let section = document.getElementById(elementId);
    section.classList.contains('hidden') ? section.classList.remove('hidden') : section.classList.add('hidden');

    let open = document.getElementById(buttonID).children;
    for (let i = 0; i < open.length; i++) {
        open[i].classList.contains('hidden') ? open[i].classList.remove('hidden') : open[i].classList.add('hidden');

    }
}

// function bookmarkPage(){
//     functionality purposefully removed by browers
// }

//#region Utilities
function inputTrim(input, max){
    if (input.value < 0) alert(`Please enter a value between 0 and ${max}`);

    input.value = Math.abs(input.value) > 0 ? Math.abs(input.value) : null;

    input.value = input.value < Number(max) ? input.value : null;

}

function switchMonthNumToString(number){
    switch (Number(number)) {
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

function switchMonthStringToNum(string){
    switch (string) {
        case "January":
            return 1;
            break;
        case "February":
            return 2;
            break;
        case "March":
            return 3;
            break;
        case "April":
            return 4;
            break;
        case "May":
            return 5;
            break;
        case "June":
            return 6;
            break;
        case "July":
            return 7;
            break;
        case "August":
            return 8;
            break;
        case "September":
            return 9;
            break;
        case "October":
            return 10;
            break;
        case "November":
            return 11;
            break;
        case "December":
            return 12;
            break;
    }
}

//#endregion

//#region Vars
let date = new Date();
let currentMonth = date.getMonth() + 1;


let data = {
    hoursRequirement: undefined,
    hoursAllowableProBono: undefined,
    startMonth: undefined,
    prorated: false,

    hours: {
        billable: [],
        proBono: [],
        prorated: [],
    }
};

let calcs = {
    monthsRemaining: undefined,
    hrsLeft_Total: undefined,
    hrsLeft_ProBono: undefined,
    hrsLeft_PerMonth: undefined,
    monthsWithoutHours: undefined,
    monthsWithHoursFuture: undefined,
};

const input_hoursRequirement = document.getElementById('BillHrReq');
input_hoursRequirement.addEventListener('change', handleChange);

const input_hoursAllowableProBono = document.getElementById('PBHrs');
input_hoursAllowableProBono.addEventListener('change', handleChange);

const input_billableYearMonthPicker = document.getElementById('billableYearMonth');
input_billableYearMonthPicker.addEventListener('change', handleChange);

const proratedYear = document.getElementById('prorated');
proratedYear.addEventListener('change', handleChange);

const table = document.getElementById('hrsTable');
const tableRows = table.children[1].children;
table.addEventListener('change', handleChange);

const output_monthsRemaining = document.getElementById('monthsLeft');
const output_hoursRemaining = document.getElementById('hrsLeftBillable');
const output_hrsLeftProBono = document.getElementById('hrsLeftProBono');
const output_hrsLeftPerMonth = document.getElementById('hrsLeftPerMonth');
const output_monthsWithoutHours = document.getElementById('monthsWithoutHours');
const output_monthsWithHoursFuture = document.getElementById('monthsWithHoursFuture');
const output_hrsBig = document.getElementById('hrs');

//#endregion

function handleChange(e){
    console.log("Setting Local Storage");
    updateData();
    updateCalcs();
    updateOutput();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
    updateTableMonths();
}

//#region Update and storage
function updateData(){
    data.hoursRequirement = Number(input_hoursRequirement.value);
    data.hoursAllowableProBono = Number(input_hoursAllowableProBono.value);
    data.startMonth = Number(input_billableYearMonthPicker.value);
    data.prorated = proratedYear.checked;

    data.hours.billable = [];
    data.hours.proBono =    [];
    data.hours.prorated = [];
    for (let i = 0; i<12; i++){
        // console.log("billable: "+tableRows[i].children[1].children[0].value)
        data.hours.billable.push(Number(tableRows[i].children[1].children[0].value));
        data.hours.proBono.push(Number(tableRows[i].children[2].children[0].value));

        data.hours.prorated.push(tableRows[i].children[3].children[0].checked);
    }
}

function showProrated(prorated){
    // let prorated = !data.prorated;
    if(prorated){
        table.children[0].children[0].children[3].classList.remove("hidden");
        for (let i = 0; i<12; i++){
            tableRows[i].children[3].classList.remove("hidden");
        }
    } else {
        table.children[0].children[0].children[3].classList.add("hidden");

        for (let i = 0; i<12; i++){
            tableRows[i].children[3].classList.add("hidden");
        }
    }
}

function updateOutput() {
    output_monthsRemaining.textContent = calcs.monthsRemaining;
    output_hoursRemaining.textContent = calcs.hrsLeft_Total;
    output_hrsLeftProBono.textContent = calcs.hrsLeft_ProBono;
    output_hrsLeftPerMonth.textContent = calcs.hrsLeft_PerMonth;
    output_monthsWithoutHours.textContent = calcs.monthsWithoutHours;
    output_monthsWithHoursFuture.textContent = calcs.monthsWithHoursFuture;
    output_hrsBig.textContent = calcs.hrsLeft_PerMonth;
}

(function onLoad(){
    setUpTable();

    console.log("Getting from Local Storage")
    if(localStorage.getItem("hrsCalculator")){
        data = JSON.parse(localStorage.getItem("hrsCalculator"));
        
        input_hoursRequirement.value = data.hoursRequirement;
        input_hoursAllowableProBono.value = data.hoursAllowableProBono;
        input_billableYearMonthPicker.value = data.startMonth;
        proratedYear.checked = data.prorated;


        updateTableMonths();
        setTableHours();
        updateCalcs();
        updateOutput();
    } else {
        console.log("Hours Calculator local information not found");

        data.hoursRequirement = 0;
        data.hoursAllowableProBono = 0;
        data.startMonth = 1;

        updateTableMonths();
        // updateCalcs();
    }

    showProrated(data.prorated);

})();

function setUpTable(){

    let rowTemplate = `
        <tr>
            <td class="table-months small-text">{{Month}}</td>
            <td class="table-number">
                <input class="billable" type="number" min="0" max="730" oninput="inputTrim(this, 730)" placeholder="0">
            </td>
            <td class="table-number table-pro-bono">
                <input class="probono" type="number" min="0" max="730" oninput="inputTrim(this, 703)" placeholder="0">
            </td>
            <td class="table-checkbox">
                <input class="checkbox center" type="checkbox">
                <label class="checkbox"></label>
            </td>
        </tr>
        `

    for (let i = 0; i<12; i++){
        table.children[1].innerHTML += rowTemplate;
    }
}

function setTableHours() {
    for (let i = 0; i < tableRows.length; i++) {
        if (data.hours.billable[i]){
            tableRows[i].children[1].children[0].value = data.hours.billable[i];
        } else tableRows[i].children[1].children[0].value = null;

        if (data.hours.proBono[i]){
            tableRows[i].children[2].children[0].value = data.hours.proBono[i];
        } else tableRows[i].children[2].children[0].value = null;

        if (data.prorated && data.hours.prorated[i]){
            tableRows[i].children[3].children[0].checked = data.hours.prorated[i];
        } else tableRows[i].children[3].children[0].checked = false;
    }
}

function updateTableMonths() {
    let month = data.startMonth;

    for (let i = 0; i < tableRows.length; i++){
        let row = tableRows[i].children[0];

        let num = Number(month) +i;
        if (num > 12) {
            num -= 12;
        }
        // row.innerHTML = "<td>"+(switchMonthNumToString(num))+"</td>";
        row.textContent = switchMonthNumToString(num);
    }
}

function resetTableHours(){
    data.hours.billable = [];
    data.hours.proBono = [];
    data.hours.prorated = [];

    updateCalcs();
    updateOutput();
    setTableHours();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
}

//#endregion

//#region Calculate

function monthsRemaining(startMonth)
{
    let result = 0;

    if (startMonth === currentMonth){
        result = 12;
    } else if(startMonth > currentMonth) {
        result = Number(startMonth - currentMonth);
    } else {
        result = 12 - Number(currentMonth - startMonth)
    }

    return result;
}

function updateCalcs(){
    calcs.monthsRemaining= Math.ceil(monthsRemaining(data.startMonth));

    let proBonoHrsTotal = 0;
    let billHrsTotal = 0;
    let billHrsLeft = 0;
    let monthsWithoutHours = 0;
    let monthsWithHoursFuture = 0;

    let proratedMonths = 0;
    let proratedMonthsRemaining = 0;

    for (i = 0; i<data.hours.proBono.length; i++){
        if(data.hours.proBono[i]){
            proBonoHrsTotal += data.hours.proBono[i];
        }
    }
    
    calcs.hrsLeft_ProBono =  proBonoHrsTotal > data.hoursAllowableProBono ? 0 : Math.ceil(data.hoursAllowableProBono - proBonoHrsTotal);

    for (i = 0; i<data.hours.billable.length; i++){
        if(data.hours.billable[i]){
            billHrsTotal += data.hours.billable[i];
        }
    }

    proBonoHrsUsed = data.hoursAllowableProBono - calcs.hrsLeft_ProBono;
    billHrsLeft = data.hoursRequirement - billHrsTotal - proBonoHrsUsed;
    
    


    let num = Number(data.startMonth) +i;
        if (num > 12) {
            num -= 12;
        }

    let adjustedCurrentMonth = currentMonth - num;
    // console.log("Current Month: "+currentMonth +"| Adjusted month: "+adjustedCurrentMonth);
    
    for (i = 0; i<12; i++){
        if(data.hours.billable[i] <= 0 && data.hours.proBono[i] <= 0){
            monthsWithoutHours++;
        }
        calcs.monthsWithoutHours = monthsWithoutHours;

        if(data.hours.billable[i] >0 && i > adjustedCurrentMonth ){
            monthsWithHoursFuture++;
        }
        calcs.monthsWithHoursFuture = monthsWithHoursFuture;
    }
    
    for(i=0; i<12; i++){
        if(data.hours.prorated[i]){
            proratedMonths++;
        }

        if(data.hours.prorated[i] && i > adjustedCurrentMonth){
            proratedMonthsRemaining++;
        }        
    }

    calcs.hrsLeft_Total = billHrsLeft > 0 ? Math.ceil(billHrsLeft*((12-proratedMonths)/12)) : 0;

    calcs.hrsLeft_PerMonth = Math.ceil(calcs.hrsLeft_Total/(calcs.monthsRemaining-proratedMonthsRemaining));


    data_donut_hours = [];
    for (let i =0; i< data.hours.billable.length; i++){
        if(i<(12-calcs.monthsRemaining) || (data.hours.billable[i] >0)){
            data_donut_hours.push(data.hours.billable[i]);
        } else {
            data_donut_hours.push(calcs.hrsLeft_PerMonth);
        }
    }

    data_donut_probono = [proBonoHrsUsed, calcs.hrsLeft_ProBono];

    updateDonut();
    // makeDonut(data.hours.billable, data_donut_probono);
}

function updateDonut(){ 

    for (let i= 0; i<12; i++){
        let num = Number(data.startMonth) +i;
        if (num > 12) {
            num -= 12;
        }

        // donut.data.labels[i] = switchMonthNumToString(num);
        donut.data.datasets[0].labels[i] = switchMonthNumToString(num);

        if(i>=(12-calcs.monthsRemaining)){
            donut.data.datasets[0].backgroundColor[i] = CHART_COLORS.prelimine_Gray;
        } else donut.data.datasets[0].backgroundColor[i] = CHART_COLORS.prelimine_Orange;
        
    }

    donut.data.datasets[0].data = data_donut_hours;
    donut.data.datasets[1].data = data_donut_probono;

    donut.update();
}

// TODO: when #inputs input:focus add .output-shifted to #outputs



