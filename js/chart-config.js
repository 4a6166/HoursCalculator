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
    grey: 'rgb(201, 203, 207)',
    prelimine_Orange: 'rgb(221, 109, 79)',
    prelimine_Blue: 'rgb(77, 130, 184)',
    prelimine_Gray: 'rgb(128, 128, 128)',
};


//setup
const DATA_COUNT_donut = 5;
const NUMBER_CFG_donut = {count: DATA_COUNT_donut, min: 0, max: 100};

let data_donut_hours = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6 ,7];
let data_donut_probono = [20, 10];

const data_donut = {
    labels: [],
    datasets: [
        {
            label: 'Hours',
            data: data_donut_hours,
            backgroundColor: [
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Orange,
            ]
        },
        {
            label: 'Pro Bono',
            data: data_donut_probono,
            backgroundColor: [
                CHART_COLORS.prelimine_Orange,
                CHART_COLORS.prelimine_Gray,
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
        maintainAspectRatio: false,
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
                display: false,
                text: 'Hours'
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
