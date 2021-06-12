//Utils
function transparentize(value, opacity) {
    opacity = opacity === undefined ? 1 : opacity;
    return value.split('\)')[0]+","+opacity+")";
}

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};


/// Total Hours

//Setup
const DATA_COUNT = 1;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 730};
const labels = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
];
const _data = [120, 150, 210, 35, 110, 115, 75, 110, 95, 100, 100, 100];
const data_totalHrs = {
    labels: labels,
    datasets: [{
        label: 'Hours',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: .2,
        backgroundColor: [
            transparentize(CHART_COLORS.red, 0.5),
            transparentize(CHART_COLORS.orange, 0.5),
            transparentize(CHART_COLORS.yellow, 0.5),
            transparentize(CHART_COLORS.green, 0.5),
            transparentize(CHART_COLORS.blue, 0.5),
            transparentize(CHART_COLORS.purple, 0.5),
            transparentize(CHART_COLORS.red, 0.5),
            transparentize(CHART_COLORS.orange, 0.5),
            transparentize(CHART_COLORS.yellow, 0.5),
            // transparentize(CHART_COLORS.green, 0.5),
            // transparentize(CHART_COLORS.blue, 0.5),
            // transparentize(CHART_COLORS.purple, 0.5),
            transparentize(CHART_COLORS.grey, 0.2),
            transparentize(CHART_COLORS.grey, 0.2),
            transparentize(CHART_COLORS.grey, 0.2),
        ],
        data: _data,
    }]
};

//Config
const config_totalHrs = {
    type: 'polarArea',
    data: data_totalHrs,
    options: {
        responsive: true,
        scales: {
            r: {
                grid: {
                    color: CHART_COLORS.orange,
                },
                ticks: {
                    color: CHART_COLORS.orange,
                    // display: false,
                    maxTicksLimit: 5,
                    stepSize: 75,
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Hours',
                // position: 'bottom',
            },
        }
    }
};

//render
var totalHrs = new Chart(
    document.getElementById('chart-totalHrs'),
    config_totalHrs
);

/// Pro Bono stacked bar

// setup
const DATA_COUNT_totalProBono = 1;
const NUMBER_CFG_totalProBono = {count: DATA_COUNT_totalProBono, min: -100, max: 100};

const labels_totalProBono = ["Pro Bono Hours"]
const _data_totalProBono_1 = [2]
const _data_totalProBono_2 = [1]
const data_totalProBono = {
    labels: labels_totalProBono,
    datasets: [
        {
            label: 'Hours Used',
            data: _data_totalProBono_1,
            backgroundColor: CHART_COLORS.red,
        },
        {
            label: 'Hours Remaining',
            data: _data_totalProBono_2,
            backgroundColor: CHART_COLORS.blue,
        }
    ]
};

// config
const config_totalProBono = {
    type: 'bar',
    data: data_totalProBono,
    options: {
        plugins: {
            legend: {
                display: false,
            },
            scaleShowLabels : false,
            title: {
                display: true,
                text: 'Pro Bono Hours'
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
            stacked: true,
            display: false,
            },
            y: {
            stacked: true,
            display: false,
            }
        }
    }
};

//reder 

var totalProBono = new Chart(
    document.getElementById('chart-totalProBono'),
    config_totalProBono
);

/// Donut

//setup
const DATA_COUNT_donut = 5;
const NUMBER_CFG_donut = {count: DATA_COUNT_donut, min: 0, max: 100};

let data_donut_hours = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6 ,7];
let data_donut_probono = [20, 10];

const data_donut = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
        {
            label: 'Hours',
            data: data_donut_hours,
            backgroundColor: CHART_COLORS.orange,
        },
        {
            label: 'Pro Bono',
            data: data_donut_probono,
            backgroundColor: [
                CHART_COLORS.orange,
                CHART_COLORS.grey,
            ],
            hoverOffset: 4,
        }
    ]
};

//config
const config_donut = {
    type: 'doughnut',
    data: data_donut,
    options: {

        responsive: true,
        circumference: 180,
        rotation: 270,
        scales: {

        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            }
        }
    },
};

Chart.overrides.doughnut.cutout = 90;

//render
var donut =  new Chart(
    document.getElementById('chart-dounut'),
    config_donut
)