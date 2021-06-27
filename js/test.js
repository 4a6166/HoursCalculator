
let testSets = [
    template = {
        shortDesc: "null template",
        longDesc: "",
        currentMonth: 0, //0 = Jan, 11 = Dec
        data: {
            hoursRequirement: undefined,
            hoursAllowableProBono: undefined,
            startMonth: undefined,
            excludeMonths: false,
    
            hours: {
                billable: [0,0,0,0,0,0,0,0,0,0,0,0],
                proBono: [0,0,0,0,0,0,0,0,0,0,0,0],
                excluded: [false,false,false,false,false,false,false,false,false,false,false,false],
                monthId: [0,1,2,3,4,5,6,7,8,9,10,11] //always 0-11 in order
            },
        },
        calcs: {
            hrsLeft_PerMonth: 0,
            monthsRemaining: 0,

            hrsLoggedBillable: 0,
            hrsCountedBillable: undefined,
            hrsToGoBillable: NaN,

            hrsLoggedProBono: 0,
            hrsCountedProBono: undefined,
            hrsLeftProBono: NaN,

            monthsWithHoursAll: 0,
            monthsWithHoursFuture: 0,
            monthsWithoutHoursPast: 12,

            monthsExclude: 0,
            hrsExclude: NaN,
            // hrsProBonoexclude: undefined,
            // updatedReq: {
            //     billable: undefined,
            //     proBono: undefined,
            // },
            
            // monthsPast: [],
            // monthsFuture: [],
        }
    },
    F2 = {
        shortDesc: "negative pro bono counted",
        longDesc: "",
        currentMonth: 5, //0 = Jan, 11 = Dec
        data: {
            hoursRequirement: 2100,
            hoursAllowableProBono: 100,
            startMonth: 7,
            excludeMonths: false,
    
            hours: {
                billable: [145, 156, 180, 156, 170, 0, 0, 150.3, 140, 144, 200, 120],
                proBono: [10, 17, 18, 20, 17, 0, 0, 3.3, 22, 32, 0, 60],
                excluded: [false, false, false, false, false, false, false, false, false, false, false, false],
                monthId: [0,1,2,3,4,5,6,7,8,9,10,11] //always 0-11 in order
            },
        },
        calcs: {
            hrsLeft_PerMonth: 219.3,
            monthsRemaining: 2,

            hrsLoggedBillable: 1561.3,
            hrsCountedBillable: 1561.3,
            hrsToGoBillable: 438.7,

            hrsCountedProBono: 100,
            hrsLoggedProBono: 199.3,
            hrsLeftProBono: 0,

            monthsWithHoursAll: 10,
            monthsWithHoursFuture: 0,
            monthsWithoutHoursPast: 0,

            monthsExclude: 0,
            hrsExclude: 0,
            // hrsProBonoexclude: undefined,
            // updatedReq: {
            //     billable: undefined,
            //     proBono: undefined,
            // },
            
            // monthsPast: [],
            // monthsFuture: [],
        }
    },
    F3 = {
        shortDesc: "first test",
        longDesc: "",
        currentMonth: 5, //0 = Jan, 11 = Dec
        data: {
            hoursRequirement: 1900,
            hoursAllowableProBono: 100,
            startMonth: 7,
            excludeMonths: false,
    
            hours: {
                billable: [0,0,0,0,180,156,0,0,0,0,0,0],
                proBono: [0,0,0,0,75,50,0,0,0,0,0,0],
                excluded: [false, false, false, false, false, false, false, false, false, false, false, false],
                monthId: [0,1,2,3,4,5,6,7,8,9,10,11] //always 0-11 in order
            },
        },
        calcs: {
            hrsLeft_PerMonth: 1439,
            monthsRemaining: 2,

            hrsLoggedBillable: 336,
            hrsCountedBillable: 180,
            hrsToGoBillable: 1645,

            hrsCountedProBono: 75,
            hrsLoggedProBono: 125,
            hrsLeftProBono: 25,

            monthsWithHoursAll: 2,
            monthsWithHoursFuture: 1,
            monthsWithoutHoursPast: 9,

            monthsExclude: 0,
            hrsExclude: 0,
            // hrsProBonoexclude: undefined,
            // updatedReq: {
            //     billable: undefined,
            //     proBono: undefined,
            // },
            
            // monthsPast: [],
            // monthsFuture: [],
        }
    },

]

function runTests(){
    console.warn("\nTests Running. Number of tests: "+testSets.length);
    let testsRun = 0;
    let testsPassed = 0;
    let testsFailed = 0;

    let result = "";
    for(z in testSets){
        try{
            let test = testSets[z];
            currentMonth = test.currentMonth;
            console.log("Setting Current Month: "+currentMonth);

            model.data=test.data;

            let run = (function(){
                table.update();
                calcs.update();
                output.update();
            })()

            let calcsTest = (function(){
                let a = Math.ceil(calcs.hrsLeft_PerMonth) === Math.ceil(test.calcs.hrsLeft_PerMonth) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsLeft_PerMonth)} Calc:${Math.ceil(calcs.hrsLeft_PerMonth)}`;
                let b = Math.ceil(calcs.monthsRemaining) === Math.ceil(test.calcs.monthsRemaining) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.monthsRemaining)} Calc:${Math.ceil(calcs.monthsRemaining)}`;
                let c = Math.ceil(calcs.hrsLoggedBillable) === Math.ceil(test.calcs.hrsLoggedBillable) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsLoggedBillable)} Calc:${Math.ceil(calcs.hrsLoggedBillable)}`;
                let d = Math.ceil(calcs.hrsCountedBillable) === Math.ceil(test.calcs.hrsCountedBillable) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsCountedBillable)} Calc:${Math.ceil(calcs.hrsCountedBillable)}`;
                let e = Math.ceil(calcs.hrsToGoBillable) === Math.ceil(test.calcs.hrsToGoBillable) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsToGoBillable)} Calc:${Math.ceil(calcs.hrsToGoBillable)}`;
                let f = Math.ceil(calcs.hrsCountedProBono) === Math.ceil(test.calcs.hrsCountedProBono) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsCountedProBono)} Calc:${Math.ceil(calcs.hrsCountedProBono)}`;
                let g = Math.ceil(calcs.hrsLoggedProBono) === Math.ceil(test.calcs.hrsLoggedProBono) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsLoggedProBono)} Calc:${Math.ceil(calcs.hrsLoggedProBono)}`;
                let h = Math.ceil(calcs.hrsLeftProBono) === Math.ceil(test.calcs.hrsLeftProBono) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsLeftProBono)} Calc:${Math.ceil(calcs.hrsLeftProBono)}`;
                let ii =Math.ceil( calcs.monthsWithHoursAll) === Math.ceil(test.calcs.monthsWithHoursAll) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.monthsWithHoursAll)} Calc:${Math.ceil(calcs.monthsWithHoursAll)}`;
                let j = Math.ceil(calcs.monthsWithHoursFuture) === Math.ceil(test.calcs.monthsWithHoursFuture) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.monthsWithHoursFuture)} Calc:${Math.ceil(calcs.monthsWithHoursFuture)}`;
                let k = Math.ceil(calcs.monthsWithoutHoursPast) === Math.ceil(test.calcs.monthsWithoutHoursPast) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.monthsWithoutHoursPast)} Calc:${Math.ceil(calcs.monthsWithoutHoursPast)}`;
                let l = Math.ceil(calcs.monthsExclude) === Math.ceil(test.calcs.monthsExclude) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.monthsExclude)} Calc:${Math.ceil(calcs.monthsExclude)}`;
                let m = Math.ceil(calcs.hrsExclude) === Math.ceil(test.calcs.hrsExclude) ? "PASS     " : `FAIL | Test:${Math.ceil(test.calcs.hrsExclude)} Calc:${Math.ceil(calcs.hrsExclude)}`;
                // let n = calcs.hrsProBonoexclude === test.calcs.hrsProBonoexclude ? "PASS     " : "FAIL";
                // let o = calcs.updatedReq === test.calcs.updatedReq ? "PASS     " : "FAIL";
                // let p = calcs.monthsPast === test.calcs.monthsPast ? "PASS     " : "FAIL";
                // let q = calcs.monthsFuture === test.calcs.monthsFuture ? "PASS     " : "FAIL";

                result = `\n` + `hrsLeft_PerMonth:`+a.padStart(50 - "hrsLeft_PerMonth".length)
                        +`\n` + `monthsRemaining:`+b.padStart(50 - `monthsRemaining`.length)
                        +`\n` + `hrsLoggedBillable:`+c.padStart(50 - `hrsLoggedBillable`.length)
                        +`\n` + `hrsCountedBillable:` + d.padStart(50 - `hrsCountedBillable`.length)
                        +`\n` + `hrsToGoBillable:` + e.padStart(50 - `hrsToGoBillable`.length)
                        +`\n` + `hrsCountedProBono:` + f.padStart(50 - `hrsCountedProBono`.length)
                        +`\n` + `hrsLoggedProBono:` + g.padStart(50 - `hrsLoggedProBono`.length)
                        +`\n` + `hrsLeftProBono:` + h.padStart(50 - `hrsLeftProBono`.length)
                        +`\n` + `monthsWithHoursAll:` + ii.padStart(50 - `monthsWithHoursAll`.length)
                        +`\n` + `monthsWithHoursFuture:` + j.padStart(50 - `monthsWithHoursFuture`.length)
                        +`\n` + `monthsWithoutHoursPast:` + k.padStart(50 - `monthsWithoutHoursPast`.length)
                        +`\n` + `monthsExclude:` + l.padStart(50 - `monthsExclude`.length)
                        +`\n` + `hrsExclude:` + m.padStart(50 - `hrsExclude`.length)
                        // +`\n` + `hrsProBonoexclude:` + n.padStart(50 - `hrsProBonoexclude`.length)
                        // +`\n` + `updatedReqs:` + o.padStart(50 - `updatedReqs`.length)
                        // +`\n` + `monthsPast:` + p.padStart(50 - `monthsPast`.length)
                        // +`\n` + `monthsFuture:` + q.padStart(50 - `monthsFuture`.length)
            })()

            if(result.includes('FAIL')){
                console.log(`%cTest: ${z} ${test.shortDesc} ${result}`, 'background: #FF6666; color: #222');
                testsFailed++;
            } else {
                console.log(`%cTest: ${z} ${test.shortDesc} ${result}`, 'background: #bada55; color: #222');
                testsPassed++;
            }

            testsRun++;
        } catch(Exception){
            console.log(Exception)
        }
    }
    
    return {
        Run: testsRun,
        Passed:testsPassed,
        Failed:testsFailed,
        tests: testSets,
    }
}
