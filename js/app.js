console.log("Welcome to Prelimine's Hours Calculator");

function changeVisibility(elementId, buttonID){
    let section = document.getElementById(elementId);
    section.classList.contains('hidden') ? section.classList.remove('hidden') : section.classList.add('hidden');

    let open = document.getElementById(buttonID).children;
    for (let i = 0; i < open.length; i++) {
        open[i].classList.contains('hidden') ? open[i].classList.remove('hidden') : open[i].classList.add('hidden');

    }
}

function showExcluded(exclude){
    if(exclude){
        input.table.children[0].children[0].children[3].classList.remove("hidden_exclude");
        for (let i = 0; i<12; i++){
            input.tableRows[i].children[3].classList.remove("hidden_exclude");
        }
    } else {
        input.table.children[0].children[0].children[3].classList.add("hidden_exclude");

        for (let i = 0; i<12; i++){
            input.tableRows[i].children[3].classList.add("hidden_exclude");
        }
    }
}

function inputTrim(input, max){
    if (input.value === "" || input.value ===  "0") {
        input.value = null;
        return;
    }

    if (input.value < 0) {
        alert(`Please enter a value between 0 and ${max}`);
        input.value = null;
    }

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

let currentMonth = new Date().getMonth();

let table = {
    data: [],
    setUp: function (){

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

        table.setData();
    },
    update: function () {
        console.log(`Updating Table`);
        for (let i = 0; i < 12; i++) {
            let j = circleMonths(model.data.startMonth+i);
            
            input.tableRows[i].children[0].textContent = switchMonthNumToString(j);
    
            if (model.data.hours.billable[j]){
                input.tableRows[i].children[1].children[0].value = model.data.hours.billable[j];
            } else input.tableRows[i].children[1].children[0].value = null;
    
            if (model.data.hours.proBono[j]){
                input.tableRows[i].children[2].children[0].value = model.data.hours.proBono[j];
            } else input.tableRows[i].children[2].children[0].value = null;
    
            if (model.data.excludeMonths && model.data.hours.excluded[j]){
                input.tableRows[i].children[3].children[0].checked = model.data.hours.excluded[j];
            } else input.tableRows[i].children[3].children[0].checked = false;
        }
        table.setData();
    },
    reset: function (){
        model.data.hours.billable = [];
        model.data.hours.proBono = [];
        model.data.hours.excluded = [];
    
        table.update();
        calcs.update();
        output.update();
        localStorage.setItem("hrsCalculator", JSON.stringify(model.data));
    },
    setData: function(){
        let tableRows = input.tableRows;
        let t =[];

        for (i =0; i<tableRows.length; i++){
            let row = {
                
                month: tableRows[i].children[0].textContent,
                monthId: switchMonthStringToNum(tableRows[i].children[0].textContent),
                monthIdShifted: undefined,
                isPast: undefined, //to be updated by setMonthsRemaining()
                hrsBillable: Number(tableRows[i].children[1].children[0].value),
                hrsProBono: Number(tableRows[i].children[2].children[0].value),
                isExcluded: Boolean(tableRows[i].children[3].children[0].checked),
            }
            t.push(row);
        }
        table.data = t;
        return t;
    },
    
}

let model = {
    data: {
        hoursRequirement: undefined,
        hoursAllowableProBono: undefined,
        startMonth: undefined,
        excludeMonths: false,

        hours: {
            billable: [],
            proBono: [],
            excluded: [],
            monthId: [0,1,2,3,4,5,6,7,8,9,10,11]
        },
    },

    update: function (){
        console.log(`Updating Data`);
        model.data.hoursAllowableProBono = Number(input.hoursAllowableProBono.value);
        model.data.hoursRequirement = Number(input.hoursRequirement.value);
        model.data.excludeMonths = input.excludeMonths.checked;
    
        for (let i = 0; i<12; i++){
            let j = circleMonthsReverse(i-model.data.startMonth);
    
            model.data.hours.billable[i]=(Number(input.tableRows[j].children[1].children[0].value));
            model.data.hours.proBono[i]=(Number(input.tableRows[j].children[2].children[0].value));
    
            model.data.hours.excluded[i]=(input.tableRows[j].children[3].children[0].checked);        
        }
    
        model.data.startMonth = Number(input.billableYearMonthPicker.value);
    
        console.log(model.data);
        console.log("Setting Local Storage");
        localStorage.setItem("hrsCalculator", JSON.stringify(model.data));
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

    monthsExclude: undefined,
    hrsExclude: undefined,
    hrsProBonoexclude: undefined,
    updatedReq: {
        billable: undefined,
        proBono: undefined,
    },
    
    monthsPast: [],
    monthsFuture: [],

    // hrsAdjustedBillable: undefined,

    update: function (){
        console.log(`Updating Calcs`);
        let tableRows = input.tableRows;
        let startMonth = model.data.startMonth;
    
        let currentMonthShifted = currentMonth > startMonth ? currentMonth - startMonth 
                                                    : currentMonth + 12 - startMonth;
    
        { // funcs that do NOT rely on other calcs
            let setMonthsRemaining = (function(){
                let result =0;
                calcs.monthsFuture = [];
                calcs.monthsPast = [];
                for (i=0; i<table.data.length; i++){
                    
                    if (i >= currentMonthShifted){
                        result++;
                        calcs.monthsFuture.push(table.data[i].monthId);
                        table.data[i].isPast = false;
                    } else {
                        calcs.monthsPast.push(table.data[i].monthId);
                        table.data[i].isPast = true;
                    }
                }
                calcs.monthsRemaining = result;
            })();
    
            let setLoggedHrs = (function(){
                calcs.hrsLoggedBillable = 0;
                calcs.hrsLoggedProBono = 0;
    
                for(i = 0; i<table.data.length; i++){
                    calcs.hrsLoggedBillable += table.data[i].hrsBillable;
                    calcs.hrsLoggedProBono += table.data[i].hrsProBono;
                }
            })();
            
            let setMonthsexclude = (function(){
                calcs.monthsExclude = 0;
                for (i=0; i<table.data.length;i++){
                    if(table.data[i].isExcluded){
                        calcs.monthsExclude++;
                    }
                }
            })();
    
            let setMonths = (function(){
                calcs.monthsWithHoursAll = 0;
                calcs.monthsWithHoursFuture = 0;
                calcs.monthsWithoutHoursPast = 0;
    
                for (i= 0; i<table.data.length; i++){
                    if(table.data[i].hrsBillable > 0){
                        calcs.monthsWithHoursAll++;
    
                        if(table.data[i].isPast === false){
                            calcs.monthsWithHoursFuture++;
                        }
                    } else {
                        if(table.data[i].isPast === true){
                            calcs.monthsWithoutHoursPast++;
                        }
                    }
                }
            })();
    
            let setHrsCounted= (function(){
                calcs.hrsCountedBillable = 0;
                calcs.hrsCountedProBono = 0;
                for (i=0; i<table.data.length; i++){
                    if(table.data[i].isExcluded == false && table.data[i].isPast == true){
                        calcs.hrsCountedBillable += table.data[i].hrsBillable;
                        calcs.hrsCountedProBono += table.data[i].hrsProBono;
                    }
                }
            })();
    
        }
    
        { //funcs that DO rely on other calcs
            let setHrsexclude= (function(){
                calcs.hrsExclude = (model.data.hoursRequirement / 12)*calcs.monthsExclude;
                calcs.hrsProBonoexclude = (model.data.hoursAllowableProBono / 12)*calcs.monthsExclude;
            })();
    
            let setHrsLeft= (function(){
                calcs.updatedReq.billable = model.data.hoursRequirement - calcs.hrsExclude;
                calcs.updatedReq.proBono = model.data.hoursAllowableProBono - calcs.hrsProBonoexclude
    
                calcs.hrsToGoBillable = calcs.updatedReq.billable - calcs.hrsCountedBillable - calcs.hrsCountedProBono;
                calcs.hrsLeftProBono = calcs.updatedReq.proBono - calcs.hrsCountedProBono;            
            })();
    
            let setHrsLeft_PerMonth= (function(){
                let hours = calcs.hrsToGoBillable;
                let months = calcs.monthsRemaining;
    
                for (i = 0; i<table.data.length; i++){
                    if(table.data[i].isPast == false && table.data[i].hrsBillable > 0 && !table.data[i].isExcluded){
                        hours -= table.data[i].hrsBillable;
                        months--;
                    }
                }
    
                calcs.hrsLeft_PerMonth = calcs.hrsToGoBillable <= 0 ? 0 :
                                            hours < 0 ? 0 :
                                            months > 0 ? hours / months :
                                            0;
    
            })();
        }
    
    
        let setDonutHours= (function(){
        
            data_donut_hours = [];
            let hrsFutureProBono = 0;
    
            for (i=0; i<table.data.length; i++){
                if(table.data[i].isExcluded){
                    data_donut_hours.push(0);
                } else if(table.data[i].isPast == true){
                    data_donut_hours.push(Math.ceil(table.data[i].hrsBillable));
                } else { 
                    if(table.data[i].hrsBillable > 0){
                        data_donut_hours.push(Math.ceil(table.data[i].hrsBillable));
                    } else {
                        data_donut_hours.push(Math.ceil(calcs.hrsLeft_PerMonth));
                    }
                    hrsFutureProBono += table.data[i].hrsProBono;
                }
            }
            
            
            let hrsLeftProBono = calcs.hrsLeftProBono - hrsFutureProBono >= 0 ? calcs.hrsLeftProBono - hrsFutureProBono 
                                : 0;
    
            data_donut_probono = [calcs.hrsCountedProBono, hrsFutureProBono, hrsLeftProBono];
        
            let updateDonut= (function(){ 
                for (let i= 0; i<12; i++){
                    let num = Number(model.data.startMonth) +i;
                    if (num > 12) {
                        num -= 12;
                    }
            
                    donut.data.datasets[0].labels[i] = switchMonthNumToString(table.data[i].monthId);
    
                    if(i>=(12-calcs.monthsRemaining)){
                        if (table.data[i].hrsBillable >0){
                            donut.data.datasets[0].backgroundColor[i] = CHART_COLORS.prelimine_Orange_Light;
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
        })();
    
        console.log(calcs);
    }
    
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
    monthsExclude: document.getElementById('monthsExcluded'),
    hrsExclude: document.getElementById('hoursExcluded'),
    // hrsAdjustedBillable: document.getElementById('hrsAdjustedBillable'),

    hrsBig: document.getElementById('hrs'),

    update: function () {
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
        output.monthsExclude.textContent = Math.ceil(calcs.monthsExclude);
        output.hrsExclude.textContent = Math.ceil(calcs.hrsExclude);
        // output.hrsAdjustedBillable = math.ceil(calcs.hrsAdjustedBillable);
    
        output.hrsBig.textContent = Math.ceil(calcs.hrsLeft_PerMonth);
    }
    
}



const input = {
    hoursRequirement: document.getElementById('BillHrReq'),
    hoursAllowableProBono: document.getElementById('PBHrs'),
    billableYearMonthPicker: document.getElementById('billableYearMonth'),
    excludeMonths: document.getElementById('Excluded'),
    table: document.getElementById('hrsTable'),
    tableRows: document.getElementById('hrsTable').children[1].children,
}

function addListeners(){
    input.hoursRequirement.addEventListener('change', handleChange);
    input.hoursAllowableProBono.addEventListener('change', handleChange);
    input.billableYearMonthPicker.addEventListener('change', handleChange);
    input.excludeMonths.addEventListener('change', handleChange);
    input.table.addEventListener('change', handleChange_table);
}

function handleChange(e){
    model.update();
    table.update();
    calcs.update();
    output.update();
}

function handleChange_table(e){
    model.update();
    // updateTable();
    calcs.update();
    output.update();
}

let Load = (function(){
    table.setUp();
    addListeners();

    console.log("Getting from Local Storage")
    if(localStorage.getItem("hrsCalculator")){
        model.data = JSON.parse(localStorage.getItem("hrsCalculator"));
        
        input.hoursRequirement.value = model.data.hoursRequirement;
        input.hoursAllowableProBono.value = model.data.hoursAllowableProBono;
        input.billableYearMonthPicker.value = model.data.startMonth;
        input.excludeMonths.checked = model.data.excludeMonths;

        console.log(model.data);
        // updateData();
        table.update();
        calcs.update();
        output.update();

    } else {
        console.log("Hours Calculator local information not found");

        model.data.hoursRequirement = 0;
        model.data.hoursAllowableProBono = 0;
        model.data.startMonth = 0;

        table.update();
    }

    showExcluded(model.data.excludeMonths);

    // changeVisibility('outputs-data', 'outputs-visibility');
})();

let test = {
    load: function (){
        // updateData();
        table.update();
        calcs.update();
        output.update();
    },

    setData: function (option){
        switch (option) {
            case 0:
                model.data.startMonth = 0;
                model.data.hoursRequirement = 1200;
                model.data.hoursAllowableProBono = 100;
                model.data.hours.billable = [0,0,0,0,0,0,0,0,0,0,0,0];
                model.data.hours.proBono = [0,0,0,0,0,0,0,0,0,0,0,0];
                model.data.excludeMonths = true;
                model.data.hours.excluded =[false,false,false,false,false,false,false,false,false,false,false,false];
                break;
            case 1:
                model.data.startMonth = 0;
                model.data.hoursRequirement = 1200;
                model.data.hoursAllowableProBono = 120;
                model.data.hours.billable = [100,100,100,100,100,100,100,100,100,100,100,100];
                model.data.hours.proBono = [10,10,10,10,10,10,10,10,10,10,10,10];
                model.data.excludeMonths = true;
                model.data.hours.excluded =[false,false,false,false,false,false,false,false,false,false,false,false];
                break;
            case 2:
                model.data.startMonth = currentMonth == 0? 11: currentMonth -1;
                model.data.hoursRequirement = 2400;
                model.data.hoursAllowableProBono = 200;
                model.data.hours.billable = [100,200,100,200,100,200,100,200,100,200,100,200];
                model.data.hours.proBono = [20,10,20,10,20,10,20,10,20,10,20,10];
                model.data.excludeMonths = true;
                model.data.hours.excluded =[false,false,false,false,false,false,false,false,false,false,false,false];
                break;
            case "f1":
                model.data.startMonth = 1;
                model.data.hoursRequirement = 2100;
                model.data.hoursAllowableProBono = 100;
                model.data.hours.billable = [194, 190, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                model.data.hours.proBono = [0,0,0,0,0,0,0,0,0,0,0,0];
                model.data.excludeMonths = true; 
                model.data.hours.excluded = [true, true, false, false, false, false, false, false, false, false, false, false];
                break;
            
            default:
                return "Input Options: 0, 1, 2, 'f1'";
        }
        
        test.load();
        return "Test: localStorage not set";
    }
};
