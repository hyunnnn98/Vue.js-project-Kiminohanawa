export const p1_chart_co2 = {
    type: 'bar',
    data: {
        labels: [
            '',
        ],
        datasets: [{
            label: 'CO2',
            backgroundColor: '',
            fill: false,
            data: [""],
        }]
    },
    options: {
        responsive: false,
        // 애니매이션 효과 줘서 그래프 올라올 때 효과줄수 있긴한데 우리 플젝에는 필요없다고 생각해서 추가 안했음.
        // animation: {
        //     easing: "easeInOutQuart", //효과
        //     duration: 1000, //지속시간 
        // },
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
                    suggestedMax: 2000,
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
            // 상단 네모난 제목박스 없애려면 fontSize 0으로 설정.
        },
        // 센서 값 위에 수치 표시
        animation: {
            // duration: 1,
            onComplete: function () {
                const chartInstance = this.chart,
                ctx = chartInstance.ctx;
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        const data = dataset.data[index] + " ppm";
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        }
    }
}
export default p1_chart_co2;