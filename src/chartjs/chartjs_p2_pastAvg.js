export const chart_data_page2 = {
  type: 'line',
  data: {
    labels: ["1", "2", '3', "4", "5", '6', "7", "8", '9', "10", "11", '12', "13", "14", '15', "16", "17", '18', "19", "20", '21', "22", "23", "24"],
    datasets: [{
      label: '',
      backgroundColor: 'rgba(32, 143, 235, 0.3)',
      borderColor: 'rgba(32, 143, 235, 1)',
      fill: true,
      data: [
        "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",

      ],
      borderWidth: 3,
    }],

  },
  options: {
    maintainAspectRatio: true,
    lineTension: 1,
    scales: {
      xAxes: [{
        gridLines: {
          lineWidth: 0
        }
      }],
      yAxes: [{
        ticks: {
          padding: 5,
          suggestedMin: 0,
        },
      }]
    },
    legend: {
      display: false,
    },

  },

}
export default chart_data_page2;