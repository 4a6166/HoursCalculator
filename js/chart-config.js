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

let data_donut_hours = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
let data_donut_probono = [0, 1];

const data_donut = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
        {
            label: 'Hours',
            data: data_donut_hours,
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "July",
                "September",
                "October",
                "November",
                "December"
            ],
            backgroundColor: [
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
                CHART_COLORS.prelimine_Gray,
            ],
            hoverOffset: 4,
            weight: 2.1,
        },
        {
            label: 'Pro Bono',
            data: data_donut_probono,
            labels: [
                'Pro Bono Hour Completed',
                'Pro Bono Hours Remaining'
            ],
            backgroundColor: [
                CHART_COLORS.prelimine_Blue,
                CHART_COLORS.prelimine_Gray,
            ],
            hoverOffset: -4,
            weight: 1,
        }
    ]
};

//tooltip
const labels = (tooltipItem) => {
    let itemIndex = tooltipItem.dataIndex;
    return tooltipItem.dataset.labels[itemIndex] +": "+tooltipItem.formattedValue+" hrs";
}

//config
const config_donut = {
    type: 'doughnut',
    data: data_donut,
    options: {
        responsive: true,
        // aspectRatio: 1,
        maintainAspectRatio: true,
        // circumference: 30,
        // rotation: 270,
        // rotation: 345,
        // cutout: 135,
        cutout: 95,

        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },   
            tooltip: {
                callbacks: {
                    label:labels,
                }
            },
        },
    },
};

//render
    var donut =  new Chart(
        document.getElementById('chart-dounut'),
        config_donut
    )
