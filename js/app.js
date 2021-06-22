console.log("Welcome to Prelimine's Hours Calculator");

function changeVisibility(elementId, buttonID){
    let section = document.getElementById(elementId);
    section.classList.contains('hidden') ? section.classList.remove('hidden') : section.classList.add('hidden');

    let open = document.getElementById(buttonID).children;
    for (let i = 0; i < open.length; i++) {
        open[i].classList.contains('hidden') ? open[i].classList.remove('hidden') : open[i].classList.add('hidden');

    }
}

function showProrated(prorated){
    // let prorated = !data.prorated;
    if(prorated){
        input.table.children[0].children[0].children[3].classList.remove("hidden_prorated");
        for (let i = 0; i<12; i++){
            input.tableRows[i].children[3].classList.remove("hidden_prorated");
        }
    } else {
        input.table.children[0].children[0].children[3].classList.add("hidden_prorated");

        for (let i = 0; i<12; i++){
            input.tableRows[i].children[3].classList.add("hidden_prorated");
        }
    }
}

//#region Utilities
function inputTrim(input, max){
    if (input.value === "" || input.value ===  "0") {
        input.value = null;
        return;
    }

    if (input.value < 0) {
        alert(`Please enter a value between 0 and ${max}`);
        input.value = null;
    }

    // input.value = Math.abs(input.value) > 0 ? Math.abs(input.value) : null;

    input.value = input.value < Number(max) ? Math.round(input.value * 10)/10 : null;

}

function circleMonths(monthId){
    return Math.abs(Number(monthId))%12;
}

function circleMonthsReverse(monthID){
    return monthID <0 ? monthID+12 : monthID;
}

function switchMonthNumToString(number){
    switch (Number(number)) {
        case 0:
            return "January";
            break;
        case 1:
            return "February";
            break;
        case 2:
            return "March";
            break;
        case 3:
            return "April";
            break;
        case 4:
            return "May";
            break;
        case 5:
            return "June";
            break;
        case 6:
            return "July";
            break;
        case 7:
            return "August";
            break;
        case 8:
            return "September";
            break;
        case 9:
            return "October";
            break;
        case 10:
            return "November";
            break;
        case 11:
            return "December";
            break;
    }
}

function switchMonthStringToNum(string){
    switch (string) {
        case "January":
            return 0;
            break;
        case "February":
            return 1;
            break;
        case "March":
            return 2;
            break;
        case "April":
            return 3;
            break;
        case "May":
            return 4;
            break;
        case "June":
            return 5;
            break;
        case "July":
            return 6;
            break;
        case "August":
            return 7;
            break;
        case "September":
            return 8;
            break;
        case "October":
            return 9;
            break;
        case "November":
            return 10;
            break;
        case "December":
            return 11;
            break;
    }
}

//#endregion

function setUpTable(){

    let rowTemplate = `
        <tr>
            <td class="table-months small-text">{{Month}}</td>
            <td class="table-number">
                <input class="billable" type="number" inputmode="decimal" autoComplete="off"  pattern="^[0-9]*([\.|\,][0-9])?$" step="0.1" onchange="inputTrim(this, 730)" placeholder="0">
            </td>
            <td class="table-number table-pro-bono">
                <input class="probono" type="number" inputmode="decimal" autoComplete="off"  pattern="^[0-9]*([\.|\,][0-9])?$" step="0.1" onchange="inputTrim(this, 730)" placeholder="0">
            </td>
            <td class="table-checkbox">
                <input class="checkbox center" type="checkbox">
                <label class="checkbox"></label>
            </td>
        </tr>
        `

    for (let i = 0; i<12; i++){
        input.table.children[1].innerHTML += rowTemplate;
    }
}

//#region Vars
let currentMonth = new Date().getMonth() + 1;

let data = {
    hoursRequirement: undefined,
    hoursAllowableProBono: undefined,
    startMonth: undefined,
    prorated: false,

    hours: {
        billable: [],
        proBono: [],
        prorated: [],
        monthId: [0,1,2,3,4,5,6,7,8,9,10,11]
    }
};

let calcs = {
    monthsRemaining: undefined,
    hrsLeft_Total: undefined,
    hrsLeft_ProBono: undefined,
    hrsLeft_PerMonth: undefined,
    monthsWithoutHours: undefined,
    pastMonths: [],
    monthsWithHoursFuture: undefined,
    futureMonths: [],

    proratedMonthsCount: undefined,
    billableReqProrated: undefined,
    proBonoAllowableProrated: undefined,
    proBonoHoursCharged: undefined,

    hoursCounted: undefined,
    hoursFuture: undefined,

};

const output = {
    monthsRemaining: document.getElementById('monthsLeft'),
    hoursRemaining: document.getElementById('hrsLeftBillable'),
    hrsLeftProBono: document.getElementById('hrsLeftProBono'),
    hrsLeftPerMonth: document.getElementById('hrsLeftPerMonth'),
    monthsWithoutHours: document.getElementById('monthsWithoutHours'),
    monthsWithHoursFuture: document.getElementById('monthsWithHoursFuture'),
    hrsBig: document.getElementById('hrs'),
}

const input = {
    hoursRequirement: document.getElementById('BillHrReq'),
    hoursAllowableProBono: document.getElementById('PBHrs'),
    billableYearMonthPicker: document.getElementById('billableYearMonth'),
    proratedYear: document.getElementById('prorated'),
    table: document.getElementById('hrsTable'),
    tableRows: document.getElementById('hrsTable').children[1].children,
}

function addListeners(){
    input.hoursRequirement.addEventListener('change', handleChange);
    input.hoursAllowableProBono.addEventListener('change', handleChange);
    input.billableYearMonthPicker.addEventListener('change', handleChange);
    input.proratedYear.addEventListener('change', handleChange);
    input.table.addEventListener('change', handleChange_table);
}
//#endregion

function handleChange(e){
    console.log("Setting Local Storage");
    updateData();
    updateCalcs();
    updateOutput();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
    updateTable();
}

function handleChange_table(e){
    console.log("Setting Local Storage");
    updateData();
    updateCalcs();
    updateOutput();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
}

//#region Update and storage
function updateData(){
    console.log(`Updating Data`);
    data.hoursAllowableProBono = Number(input.hoursAllowableProBono.value);
    data.hoursRequirement = Number(input.hoursRequirement.value);
    data.prorated = input.proratedYear.checked;

    // console.log(data.startMonth+" "+switchMonthNumToString(data.startMonth));

    for (let i = 0; i<12; i++){
        let j = circleMonthsReverse(i-data.startMonth);

        data.hours.billable[i]=(Number(input.tableRows[j].children[1].children[0].value));
        data.hours.proBono[i]=(Number(input.tableRows[j].children[2].children[0].value));

        data.hours.prorated[i]=(input.tableRows[j].children[3].children[0].checked);        
    }

    data.startMonth = Number(input.billableYearMonthPicker.value);
}

function resetHours(){
    data.hours.billable = [0,1,2,3,4,5,6,7,8,9,10,11];
    updateTable();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
}

function updateTable() {
    console.log(`Updating Table`);
    for (let i = 0; i < 12; i++) {
        let j = circleMonths(data.startMonth+i);
        
        input.tableRows[i].children[0].textContent = switchMonthNumToString(j);

        if (data.hours.billable[j]){
            input.tableRows[i].children[1].children[0].value = data.hours.billable[j];
        } else input.tableRows[i].children[1].children[0].value = null;

        if (data.hours.proBono[j]){
            input.tableRows[i].children[2].children[0].value = data.hours.proBono[j];
        } else input.tableRows[i].children[2].children[0].value = null;

        if (data.prorated && data.hours.prorated[j]){
            input.tableRows[i].children[3].children[0].checked = data.hours.prorated[j];
        } else input.tableRows[i].children[3].children[0].checked = false;
    }
}

function resetTableHours(){
    data.hours.billable = [];
    data.hours.proBono = [];
    data.hours.prorated = [];

    updateCalcs();
    updateOutput();
    updateTable();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
}

function updateOutput() {
    console.log("Updating Output");
    output.monthsRemaining.textContent = calcs.monthsRemaining;
    output.hoursRemaining.textContent = calcs.hrsLeft_Total;
    output.hrsLeftProBono.textContent = calcs.hrsLeft_ProBono;
    output.hrsLeftPerMonth.textContent = calcs.hrsLeft_PerMonth;
    output.monthsWithoutHours.textContent = calcs.monthsWithoutHours;
    output.monthsWithHoursFuture.textContent = calcs.monthsWithHoursFuture;
    output.hrsBig.textContent = calcs.hrsLeft_PerMonth;
}

//#endregion

//#region Calculate

function setMonthsRemaining()
{
    let result = 0;
    let startMonth = data.startMonth;

    if (startMonth === currentMonth){
        result = 12;
    } else if(startMonth > currentMonth) {
        result = Number(startMonth - currentMonth);
    } else {
        result = 12 - Number(currentMonth - startMonth)
    }

    calcs.monthsRemaining = Math.ceil(result);
    return result;
}

function setProratedMonthsCount(){
    let count = 0;
    for(let i =0; i<12; i++){
        if (data.hours.prorated[i]){
            count++;
        }
    }
    calcs.proratedMonthsCount = count;
    calcs.billableReqProrated = data.hoursRequirement*((12-calcs.proratedMonthsCount)/12);
    calcs.proBonoAllowableProrated = data.hoursAllowableProBono*((12-calcs.proratedMonthsCount)/12);
    return count;
}

function setHrsLeftProBono(){
    calcs.proBonoHoursCharged = 0;

    for (i = 0; i<data.hours.proBono.length; i++){
        if(data.hours.proBono[i]){
            calcs.proBonoHoursCharged += data.hours.proBono[i];
        }
    }
    
    calcs.hrsLeft_ProBono =  calcs.proBonoHoursCharged > calcs.proBonoAllowableProrated ? 0 : Math.ceil(calcs.proBonoAllowableProrated - calcs.proBonoHoursCharged);

    return calcs.proBonoHoursCharged;
}

function setHrsLeftTot(){
    let billedHrs = 0;
    let proBonoUsed = calcs.proBonoHoursCharged < calcs.proBonoAllowableProrated ? calcs.proBonoHoursCharged : calcs.proBonoAllowableProrated; 
    let m = circleMonths(i+data.startMonth);

    for (let i = 0; i< data.hours.billable.length; i++){
        if (!data.hours.prorated[i] && m < currentMonth){
            billedHrs += data.hours.billable[i];
        }
    }

    let result = calcs.billableReqProrated-billedHrs - proBonoUsed;
    calcs.hrsLeft_Total = result > 0 ? Math.ceil(result) : 0;
}

function setHrsLeftPerMonth(){

    let result = calcs.hrsLeft_Total/(calcs.monthsRemaining - calcs.monthsWithHoursFuture);
 
    calcs.hrsLeft_PerMonth = result >0 ? Math.ceil(result) : 0;
    return result;
}

function setPastFutureMonths(){
    let startMonth = data.startMonth;
    calcs.monthsWithoutHours = 0;
    calcs.monthsWithHoursFuture = 0;

    for (i= 0; i <12; i++){

        if (i >=startMonth && i < currentMonth){
            calcs.pastMonths.push(i);
            if(data.hours.billable[i] == 0 || data.hours.billable[i] == null || data.hours.billable[i] == undefined ){
                calcs.monthsWithoutHours++;
            }
        } else if (i<startMonth && i> currentMonth){
            calcs.pastMonths.push(i);
            if(data.hours.billable[i] == 0 || data.hours.billable[i] == null || data.hours.billable[i] == undefined ){
                calcs.monthsWithoutHours++;
            }
        } else if (i >startMonth && i>currentMonth){
            calcs.futureMonths.push(i);
            if(data.hours.billable[i] >0){
                calcs.monthsWithHoursFuture++;
            }
        } else if(i < startMonth && i<currentMonth){
            calcs.futureMonths.push(i);
            if(data.hours.billable[i] >0){
                calcs.monthsWithHoursFuture++;
            }
        }

    }
}

function updateCalcs(){
    console.log(`Updating Calcs`);
    setMonthsRemaining();
    setProratedMonthsCount();
    setPastFutureMonths();
    setHrsLeftProBono();
    setHrsLeftTot();
    setHrsLeftPerMonth();


    setDonutHours();

    return true;
}

function setDonutHours(){

    proBonoHrsUsed = data.hoursAllowableProBono - calcs.hrsLeft_ProBono;

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

    donut_full.data.datasets[0].data = data_donut_hours;
    donut_full.data.datasets[1].data = data_donut_probono;
    donut_full.update();
}

(function onLoad(){
    setUpTable();
    addListeners();

    console.log("Getting from Local Storage")
    if(localStorage.getItem("hrsCalculator")){
        data = JSON.parse(localStorage.getItem("hrsCalculator"));
        
        input.hoursRequirement.value = data.hoursRequirement;
        input.hoursAllowableProBono.value = data.hoursAllowableProBono;
        input.billableYearMonthPicker.value = data.startMonth;
        input.proratedYear.checked = data.prorated;

        console.log(data);
        // updateData();
        updateCalcs();
        updateOutput();
        updateTable();

    } else {
        console.log("Hours Calculator local information not found");

        data.hoursRequirement = 0;
        data.hoursAllowableProBono = 0;
        data.startMonth = 0;

        updateTable();
    }

    showProrated(data.prorated);

    // changeVisibility('outputs-data', 'outputs-visibility');
})();