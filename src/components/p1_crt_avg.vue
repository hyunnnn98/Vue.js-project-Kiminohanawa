<template>
  <div>
    <div id="p1_avgBtnBox">
      <v-btn
        id="p1_avgSelectBtn"
        small depressed
        @click="changeChartCSS('CO2')"
      ><div id="icon_co2"></div>CO2</v-btn>
      <v-btn
        id="p1_avgSelectBtn"
        small depressed
        @click="changeChartCSS('PM2.5')"
      ><div id="icon_pm25"></div>PM2.5</v-btn>
      <v-btn
        id="p1_avgSelectBtn" 
        small depressed
        @click="changeChartCSS('PM10')"
      ><div id="icon_pm10"></div>PM10</v-btn>
    </div>
    <canvas id="chart_Multidata"></canvas>
  </div>
</template>

<script>
import chartjs_Multidata from "../chartjs/chartjs_p1_avg";

export default {
  props: ["chart_data"],
  methods: {
    setChartCSS(sensor, backgroundColor, borderColor) {
        chartjs_Multidata.data.datasets[0].label                        = sensor
        chartjs_Multidata.__ob__.value.data.datasets[0].backgroundColor = backgroundColor
        chartjs_Multidata.__ob__.value.data.datasets[0].borderColor     = borderColor
    },
    changeChartCSS(sensor) {
      this.selectAvgChart = sensor;   // 선택산 센서값 복사

      console.log(`p1_crt_avg : 센서값 ${sensor}로 변경 요청!`)
      // 이름 && 색상 && y축 change
      if(sensor == 'CO2') {
          this.setChartCSS(sensor, 'rgba(32, 143, 235, 0.3)', 'rgba(32, 143, 235, 1)')        // color : blue  
      }else if(sensor == 'PM2.5') {
          this.setChartCSS(sensor, 'rgba(255, 99, 132, 0.3)', 'rgba(255, 99, 132, 1)')        // color : pink
      }else if(sensor == 'PM10') {
          this.setChartCSS(sensor, 'rgba(34, 168, 45, 0.3)', 'rgba(34, 168, 45, 1)')          // color : green  
      }
      // chart 데이터 값 변경
      this.updateChart(sensor);
    },
    updateChart(sensor) {
      for (let i = 0; i < 6; i++) {
          if(sensor == 'CO2') {
            this.chartjs_Multidata.__ob__.value.data.datasets[0].data[i] = this.chart_data[i][0]
          }else if(sensor == 'PM2.5') {
            this.chartjs_Multidata.__ob__.value.data.datasets[0].data[i] = this.chart_data[i][1]
          }else if(sensor == 'PM10') {
            this.chartjs_Multidata.__ob__.value.data.datasets[0].data[i] = this.chart_data[i][2]
          }
        }
        this.chartValue.update();  
    },
    changeClock() {
      for (let i = 0; i < 6; i++) {
        if (this.user_Time - 5 + i < 0) {
          this.chartjs_Multidata.__ob__.value.data.labels[i] = this.user_Time - 5 + i + 24 + ":00"
        } else {
          this.chartjs_Multidata.__ob__.value.data.labels[i] = this.user_Time - 5 + i + ":00"
        }
      }
    }
  },
  data() {
    return {
      chartjs_Multidata   : chartjs_Multidata,
      chartValue          : "",
      selectAvgChart      : "CO2",
      user_Time           : new Date().getHours()
    };
  },
  mounted() {
    // console.log("p1_crt_avg : 시간 초기화 알고리즘 작동.")
    this.changeClock()

    // co2 sensor값으로 초기 CSS 셋팅. (co2 sensor로 이름, graph컬러변경)
    this.setChartCSS('CO2', 'rgba(32, 143, 235, 0.3)', 'rgba(32, 143, 235, 1)')

    // console.log("p1_crt_avg : sensor값 초기 셋팅")
    for (let i = 0; i < 6; i++) {
      this.chartjs_Multidata.__ob__.value.data.datasets[0].data[i] = this.chart_data[i][0];
    }

    // console.log("p1_crt_avg : MultipleChart 생성!"); 
    const crt_MultiData = document.getElementById("chart_Multidata");
    this.chartValue = new Chart(crt_MultiData, {
      type:     chartjs_Multidata.type,
      data:     chartjs_Multidata.data,
      options:  chartjs_Multidata.options
    });

    // 정각마다 시간 초기화
    const schedule = require('node-schedule');
    const dataReload = schedule.scheduleJob('00 * * * *', () => {
      this.user_Time = new Date().getHours();
      console.log("p1_crt_avg : 시간 초기화!")
    })
  },
  watch: {
    // 차트데이터 변화 감지
    chart_data: function() {
      // this.chartValue.update(this.selectAvgChart)
      this.updateChart(this.selectAvgChart)
    },
    // 시간 변화 감지
    user_Time: function() {
      this.changeClock()
    }
  }
};
</script>
