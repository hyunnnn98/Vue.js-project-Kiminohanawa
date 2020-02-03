<template>
  <div>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <span id="p1_textDanger" v-on="on">{{levelTxt_pm10}}</span>
      </template>
      <div id="p1_tooltipON">
        <p id="p1_tootlipSensorTxt">미세먼지 (PM10)</p>
        <div><p id="p1_tooltipRed"></p> : 매우 나쁨 (150~)</div>
        <div><p id="p1_tooltipYellow"></p> : 나쁨 (80~)</div>
        <div><p id="p1_tooltipGreen"></p> : 보통 (30~)</div>
        <div><p id="p1_tooltipBlue"></p> : 좋음 (0~)</div>
      </div>
    </v-tooltip>
    <canvas id="chart_pm10" width="90px" height="230"></canvas>
  </div>
</template>

<script>
import chartjs_pm10 from "../chartjs/chartjs_p1_pm10.js";

export default {
  props: ["chart_pm10_data"],
  methods: {
    createChart(chartId, chartData) {
      const crt_pm10     = document.getElementById(chartId);
      const myChart = new Chart(crt_pm10, {
        type:     chartData.type,
        data:     chartData.data,
        options:  chartData.options
      });
      return myChart;
    }
  },
  data() {
    return {
      chartjs_pm10   : chartjs_pm10,
      chartValue     : "",
      levelTxt_pm10  : "",
    };
  },
  watch: {
    chart_pm10_data: function() {
      this.chartjs_pm10.__ob__.value.data.datasets[0].data[0] = this.chart_pm10_data[5][2]
      const realTimeValue = this.chart_pm10_data[5][2];
      if(realTimeValue >= 150) {
          this.chartjs_pm10.__ob__.value.data.datasets[0].backgroundColor = 'rgb(248, 45, 45)'
          this.levelTxt_pm10 = "매우 나쁨"
      }else if(realTimeValue >= 80) {
          this.chartjs_pm10.__ob__.value.data.datasets[0].backgroundColor = 'rgb(255, 164, 28)'
          this.levelTxt_pm10 = "나쁨"
      }else if(realTimeValue >= 30) {
          this.chartjs_pm10.__ob__.value.data.datasets[0].backgroundColor = 'rgb(34, 168, 52)'
          this.levelTxt_pm10 = "보통"
      }else {
          this.chartjs_pm10.__ob__.value.data.datasets[0].backgroundColor = 'rgb(48, 66, 228)'
          this.levelTxt_pm10 = "좋음"
      }
      this.chartValue.update()
      // console.log("p1 pm10에서 호출함! : " + this.chart_pm10_data[5][2]) // 프롭스를 통해 data값 잘 받아짐
    }
  },
  mounted: function() {
    const crt_pm10 = document.getElementById("chart_pm10")
    this.chartValue = new Chart(crt_pm10, {
      type:        chartjs_pm10.type,
      data:        chartjs_pm10.data,
      options:     chartjs_pm10.options
    });
    // console.log("p1 - pm10 new Chart 생성!")
  }
};
</script>