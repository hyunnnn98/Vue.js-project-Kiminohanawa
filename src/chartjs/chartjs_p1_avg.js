// const user_Time = new Date();

export const chart_data_page1 = {
    type: 'bar',
    data: {
        labels: [ // Date Objects
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        datasets: [{
            label: '',
            backgroundColor: 'rgba(32, 143, 235, 0.3)',
            borderColor: 'rgba(32, 143, 235, 1)',
            fill: true,
            data: [
                "", "", "", "", "", ""
            ],
            borderWidth: 2,
        }, ],

    },
    options: {
        maintainAspectRatio: false,
        title: {
            text: 'pg1_Avg'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '',
                },
                gridLines: {
                    lineWidth: 0
                },
                ticks: {
                    suggestedMin: 0,
                },
            }],
            xAxes: [{
                gridLines: {
                    lineWidth: 0
                },
                ticks: {
                    fontStyle: 'bold'
                },
            }],

        },
        legend: {
            display: false,
            // 상단 네모난 제목박스 없애려면 fontSize 0으로 설정.
        },
        animation: {
            onComplete: function () {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.fontColor = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        }
    }
}
export default chart_data_page1;