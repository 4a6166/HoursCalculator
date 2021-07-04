
let testSets = [
    /* 
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
    */
    F1 = {
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
    F2 = {
        shortDesc: "pro bono hours in future toward avg",
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
    console.group("%cTesting...", "background-color: white; color: black; padding-right: 150px;");
    let testsRun = 0;
    let testsPassed = 0;
    let testsFailed = 0;

    for(z in testSets){
        try{

            let results = []// {status: "passed", function: "hrsLeft_PerMonth", asserted: "1", returned: "1"},
            
            let testPassed = true;
            let test = testSets[z];

            currentMonth = test.currentMonth;
            model.data=test.data;

            table.update(0);
            calcs.update(0);
            output.update(0);

            for(x in test.calcs){
                let result= {
                    status: "",
                    attribute: x, 
                    asserted: Math.ceil(test.calcs[x]),
                    returned: Math.ceil(calcs[x]),
                };
                result.status = result.asserted === result.returned ? "passed" : "failed";
                result.status === "failed" ? testPassed = false : "";
                results.push(result);
            }

            if(testPassed){
                testsPassed++;
                console.groupCollapsed("PASSED\n"+'Unit: ' + test.shortDesc);  
            } else {
                testsFailed++;
                console.group("%cFAILED\n"+'Unit: ' + test.shortDesc, "background-color:red; color: black;");
            }

            for (var r in results) {
                var res = results[r];
                console.groupCollapsed('%c  %c' + res.attribute+": "+res.status, 'background-color: ' + (res.status === 'failed' ? 'red' : 'green') + '; margin-right: 10px', 'background-color: transparent');
                console.table({
                    Result:   {value: res.status},
                    Attribute: {value: res.attribute},
                    Asserted: {value: res.asserted},
                    Returned: {value: res.returned}
                });
                console.groupEnd();
            }
            console.groupEnd();    

            testsRun++;
        } catch(Exception){
            console.log(Exception)
        }


    }

    console.groupEnd();
    console.table({
        "Tests Run": testsRun,
        "Passed": testsPassed,
        "Failed":testsFailed,
    });
    return "Testing completed";

}
