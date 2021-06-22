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
let currentMonth = new Date().getMonth();

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
    hrsLeft_PerMonth: undefined,
    monthsRemaining: undefined,

    hrsLoggedBillable: undefined,
    hrsCountedBillable: undefined,
    hrsToGoBillable: undefined,

    hrsCountedProBono: undefined,
    hrsLoggedProBono: undefined,
    hrsLeftProBono: undefined,

    monthsWithHoursAll: undefined,
    monthsWithHoursFuture: undefined,
    monthsWithoutHoursPast: undefined,

    monthsProrated: undefined,
    hrsProrated: undefined,
    hrsProBonoProrated: undefined,
    updatedReq: {
        billable: undefined,
        proBono: undefined,
    },
    
    pastMonths: [],
    futureMonths: [],

    hrsAdjustedBillable: undefined,
};

const output = {
    hrsLeft_PerMonth: document.getElementById('hrsLeftPerMonth'),
    monthsRemaining: document.getElementById('monthsLeft'),
    hrsLoggedBillable: document.getElementById('hrsLoggedBillable'),
    hrsCountedBillable: document.getElementById('hrsCountedBillable'),
    hrsLeft_Total: document.getElementById('hrsLeftBillable'),
    hrsLoggedProBono: document.getElementById('hrsLoggedProBono'),
    hrsCountedProBono: document.getElementById('hrsCountedProBono'),
    hrsLeftProBono: document.getElementById('hrsLeftProBono'),
    monthsWithHoursAll: document.getElementById('monthsWithHours'),
    monthsWithHoursFuture: document.getElementById('monthsWithHoursFuture'),
    monthsWithoutHoursPast: document.getElementById('monthsWithoutHours'),
    monthsProrated: document.getElementById('monthsProrated'),
    hrsProrated: document.getElementById('hoursProrated'),
    // hrsAdjustedBillable: document.getElementById('hrsAdjustedBillable'),

    hrsBig: document.getElementById('hrs'),
}

function updateOutput() {
    console.log("Updating Output");
    output.hrsLeft_PerMonth.textContent = Math.ceil(calcs.hrsLeft_PerMonth);
    output.monthsRemaining.textContent = Math.ceil(calcs.monthsRemaining);
    output.hrsLoggedBillable.textContent = Math.ceil(calcs.hrsLoggedBillable);
    output.hrsCountedBillable.textContent = Math.ceil(calcs.hrsCountedBillable);
    output.hrsLeft_Total.textContent = Math.ceil(calcs.hrsToGoBillable);
    output.hrsLoggedProBono.textContent = Math.ceil(calcs.hrsLoggedProBono);
    output.hrsCountedProBono.textContent = Math.ceil(calcs.hrsCountedProBono);
    output.hrsLeftProBono.textContent = Math.ceil(calcs.hrsLeftProBono);
    output.monthsWithHoursAll.textContent = Math.ceil(calcs.monthsWithHoursAll);
    output.monthsWithHoursFuture.textContent = Math.ceil(calcs.monthsWithHoursFuture);
    output.monthsWithoutHoursPast.textContent = Math.ceil(calcs.monthsWithoutHoursPast);
    output.monthsProrated.textContent = Math.ceil(calcs.monthsProrated);
    output.hrsProrated.textContent = Math.ceil(calcs.hrsProrated);
    // output.hrsAdjustedBillable = math.ceil(calcs.hrsAdjustedBillable);

    output.hrsBig.textContent = Math.ceil(calcs.hrsLeft_PerMonth);
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

//#region hanlders
function handleChange(e){
    console.log("Setting Local Storage");
    updateData();
    updateTable();
    updateCalcs();
    updateOutput();
}

function handleChange_table(e){
    console.log("Setting Local Storage");
    updateData();
    // updateTable();
    updateCalcs();
    updateOutput();
}
//#endregion
//#region Update and storage
function updateData(){
    console.log(`Updating Data`);
    data.hoursAllowableProBono = Number(input.hoursAllowableProBono.value);
    data.hoursRequirement = Number(input.hoursRequirement.value);
    data.prorated = input.proratedYear.checked;

    for (let i = 0; i<12; i++){
        let j = circleMonthsReverse(i-data.startMonth);

        data.hours.billable[i]=(Number(input.tableRows[j].children[1].children[0].value));
        data.hours.proBono[i]=(Number(input.tableRows[j].children[2].children[0].value));

        data.hours.prorated[i]=(input.tableRows[j].children[3].children[0].checked);        
    }

    data.startMonth = Number(input.billableYearMonthPicker.value);

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

    updateTable();
    updateCalcs();
    updateOutput();
    localStorage.setItem("hrsCalculator", JSON.stringify(data));
}
//#endregion

function updateCalcs(){
    console.log(`Updating Calcs`);
    let tableRows = input.tableRows;
    let startMonth = data.startMonth;

    function getTableArray(){
        let array =[];

        for (i =0; i<tableRows.length; i++){
            let rowArray = [
                
                Number(tableRows[i].children[1].children[0].value),
                Number(tableRows[i].children[2].children[0].value),
                Boolean(tableRows[i].children[3].children[0].checked),
                switchMonthStringToNum(tableRows[i].children[0].textContent),
            ]
            array.push(rowArray);
        }
        // console.log(array);
        return array;
    }
    let tableArray = getTableArray();
    let currentMonthShifted = currentMonth > startMonth ? currentMonth - startMonth : currentMonth + 12 - startMonth;

    { // funcs that do NOT rely on other calcs
        function setMonthsRemaining(){
            result =0;
            calcs.futureMonths = [];
            calcs.pastMonths = [];
            for (i=0; i<tableArray.length; i++){
                if (i > currentMonthShifted){
                    result++;
                    calcs.futureMonths.push(tableArray[i][3]);
                    tableArray[i].push("future");
                } else {
                    calcs.pastMonths.push(tableArray[i][3]);
                    tableArray[i].push("past");
                }
            }
            return result;
        }
        calcs.monthsRemaining = setMonthsRemaining();

        function setLoggedHrs(){
            calcs.hrsLoggedBillable = 0;
            calcs.hrsLoggedProBono = 0;

            for(i = 0; i<tableArray.length; i++){
                calcs.hrsLoggedBillable += tableArray[i][0];
                calcs.hrsLoggedProBono += tableArray[i][1];
            }
        }
        setLoggedHrs();
        
        function setMonthsProrated(){
            calcs.monthsProrated = 0;
            for (i=0; i<tableArray.length;i++){
                if(tableArray[i][2]){
                    calcs.monthsProrated++;
                }
            }
        }
        setMonthsProrated();

        function setMonths(){
            calcs.monthsWithHoursAll = 0;
            calcs.monthsWithHoursFuture = 0;
            calcs.monthsWithoutHoursPast = 0;

            for (i= 0; i<tableArray.length; i++){
                if(tableArray[i][0] > 0){
                    calcs.monthsWithHoursAll++;

                    if(tableArray[i][4] === "future"){
                        calcs.monthsWithHoursFuture++;
                    }
                } else {
                    if(tableArray[i][4] === "past"){
                        calcs.monthsWithoutHoursPast++;
                    }
                }
            }
        }
        setMonths();

        function setHrsCounted(){
            calcs.hrsCountedBillable = 0;
            calcs.hrsCountedProBono = 0;
            for (i=0; i<tableArray.length; i++){
                if(tableArray[i][2] == false && tableArray[i][4] == "past"){
                    calcs.hrsCountedBillable += tableArray[i][0];
                    calcs.hrsCountedProBono += tableArray[i][1];
                }
            }
        }
        setHrsCounted();


    }

    { //funcs that DO rely on other calcs
        function setHrsProrated(){
            // hrs req / 12 * proratedMonths
            calcs.hrsProrated = (data.hoursRequirement / 12)*calcs.monthsProrated;
            calcs.hrsProBonoProrated = (data.hoursAllowableProBono / 12)*calcs.monthsProrated;
        }
        setHrsProrated();

        function setHrsLeft(){
            calcs.updatedReq.billable = data.hoursRequirement - calcs.hrsProrated;
            calcs.updatedReq.proBono = data.hoursAllowableProBono - calcs.hrsProBonoProrated

            calcs.hrsToGoBillable = calcs.updatedReq.billable - calcs.hrsCountedBillable - calcs.hrsCountedProBono;
            calcs.hrsLeftProBono = calcs.updatedReq.proBono - calcs.hrsCountedProBono;
            
            calcs.hrsLeft_PerMonth = calcs.hrsToGoBillable / calcs.monthsRemaining;
            
        }
        setHrsLeft();
    }


    function setDonutHours(){
    
        data_donut_hours = [];
        for (i=0; i<tableArray.length; i++){
            if(tableArray[i][4] == "past" || tableArray[i][0] > 0){
                data_donut_hours.push(tableArray[i][0])
            } else {
                data_donut_hours.push(calcs.hrsLeft_PerMonth)
            }
        }
    
        data_donut_probono = [calcs.hrsCountedProBono, calcs.hrsLeftProBono];
    
        (function updateDonut(){ 
            for (let i= 0; i<12; i++){
                let num = Number(data.startMonth) +i;
                if (num > 12) {
                    num -= 12;
                }
        
                donut.data.datasets[0].labels[i] = switchMonthNumToString(num);
        
                if(i>=(12-calcs.monthsRemaining)){
                    if (tableArray[i][0] >0){
                        donut.data.datasets[0].backgroundColor[i] = CHART_COLORS.prelimine_Blue;
                    } else {
                        donut.data.datasets[0].backgroundColor[i] = CHART_COLORS.prelimine_Gray;
                    }
                } else donut.data.datasets[0].backgroundColor[i] = CHART_COLORS.prelimine_Orange;
                
            }
        
            donut.data.datasets[0].data = data_donut_hours;
            donut.data.datasets[1].data = data_donut_probono;
            donut.update();
        
            donut_full.data.datasets[0].data = data_donut_hours;
            donut_full.data.datasets[1].data = data_donut_probono;
            donut_full.update();
        })()       
    }
    setDonutHours();
}

//#region Load and Test
function Load(){
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
        updateTable();
        updateCalcs();
        updateOutput();

    } else {
        console.log("Hours Calculator local information not found");

        data.hoursRequirement = 0;
        data.hoursAllowableProBono = 0;
        data.startMonth = 0;

        updateTable();
    }

    showProrated(data.prorated);

    // changeVisibility('outputs-data', 'outputs-visibility');
}

(function onLoad(){
    Load();
})()

function setTestHours(option){
    switch (option) {
        case 0:
            data.startMonth = 0;
            data.hoursRequirement = 1200;
            data.hoursAllowableProBono = 100;
            data.hours.billable = [0,0,0,0,0,0,0,0,0,0,0,0];
            data.hours.proBono = [0,0,0,0,0,0,0,0,0,0,0,0];
            data.hours.prorated =[false,false,false,false,false,false,false,false,false,false,false,false];

            localStorage.setItem("hrsCalculator", JSON.stringify(data));
            Load();
            break;
        case 1:
            data.startMonth = 0;
            data.hoursRequirement = 1200;
            data.hoursAllowableProBono = 120;
            data.hours.billable = [100,100,100,100,100,100,100,100,100,100,100,100];
            data.hours.proBono = [10,10,10,10,10,10,10,10,10,10,10,10];
            data.hours.prorated =[false,false,false,false,false,false,false,false,false,false,false,false];

            localStorage.setItem("hrsCalculator", JSON.stringify(data));
            Load();
            break;
        case 2:
            data.startMonth = currentMonth == 0? 11: currentMonth -1;
            data.hoursRequirement = 2400;
            data.hoursAllowableProBono = 200;
            data.hours.billable = [100,200,100,200,100,200,100,200,100,200,100,200];
            data.hours.proBono = [20,10,20,10,20,10,20,10,20,10,20,10];
            data.hours.prorated =[false,false,false,false,false,false,false,false,false,false,false,false];
            
            localStorage.setItem("hrsCalculator", JSON.stringify(data));
            Load();
            break;
    
        default:
            console.log("Options: 0, 1, 2");
    }
}
//#endregion