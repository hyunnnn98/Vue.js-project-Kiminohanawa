export const p1_chart_pm25 = {
    type: 'bar',
    data: {
        labels: [
            '',
        ],
        datasets: [{
            label: 'PM2.5',
            backgroundColor: '',
            fill: false,
            data: [""],
        }]
    },
    options: {
        responsive: false,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 30
            }
        },
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    suggestedMax: 75,
                    suggestedMin: 0
                }
            }],
            xAxes: [{
                display: false,
                ticks: {
                    fontStyle: 'bold'
                },
            }]
        },
        legend: {
            display: false,
        },
        animation: {
            onComplete: function () {
                const chartInstance = this.chart,
                ctx = chartInstance.ctx;
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        const data = dataset.data[index] + " ㎍/㎥";
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        }
    }
}
export default p1_chart_pm25;