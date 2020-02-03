<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <span id="p1_textDanger" v-on="on">{{levelTxt_pm25}}</span>
      </template>
      <div id="p1_tooltipON">
        <p id="p1_tootlipSensorTxt">초미세먼지 (PM2.5)</p>        
        <div><p id="p1_tooltipRed"></p> : 매우 나쁨 (75~)</div>
        <div><p id="p1_tooltipYellow"></p> : 나쁨 (35~)</div>
        <div><p id="p1_tooltipGreen"></p> : 보통 (15~)</div>
        <div><p id="p1_tooltipBlue"></p> : 좋음 (0~)</div>
      </div>
    </v-tooltip>
    <canvas id="chart_pm25" width="90px" height="230"></canvas>
  </div>
</template>

<script>
import chartjs_pm25 from "../chartjs/chartjs_p1_pm25";

export default {
  props: ["chart_pm25_data"],
  methods: {
  },
  data() {
    return {
      chartjs_pm25    : chartjs_pm25,
      chartValue      : "",
      levelTxt_pm25   : "",
    };
  },
  watch: {
    chart_pm25_data: function(data) {
      this.chartjs_pm25.__ob__.value.data.datasets[0].data[0] = this.chart_pm25_data[5][1];
      const realTimeValue = this.chart_pm25_data[5][1];
      if(realTimeValue >= 75) {
          this.chartjs_pm25.__ob__.value.data.datasets[0].backgroundColor = 'rgb(248, 45, 45)'
          this.levelTxt_pm25 = "매우 나쁨"
      }else if(realTimeValue >= 35) {
          this.chartjs_pm25.__ob__.value.data.datasets[0].backgroundColor = 'rgb(255, 164, 28)'
          this.levelTxt_pm25 = "나쁨"
      }else if(realTimeValue >= 15) {
          this.chartjs_pm25.__ob__.value.data.datasets[0].backgroundColor = 'rgb(34, 168, 52)'
          this.levelTxt_pm25 = "보통"
      }else {
          this.chartjs_pm25.__ob__.value.data.datasets[0].backgroundColor = 'rgb(48, 66, 228)'
          this.levelTxt_pm25 = "좋음"
      }
      this.chartValue.update();
      // console.log("p1 pm25에서 호출함! : " + this.chart_pm25_data[5][1]); // 프롭스를 통해 data값 잘 받아짐
    }
  },
  mounted: function() {
    const crt_pm25 = document.getElementById("chart_pm25")
    this.chartValue = new Chart(crt_pm25, {
      type:        chartjs_pm25.type,
      data:        chartjs_pm25.data,
      options:     chartjs_pm25.options
    });
    // console.log("p1 - pm25 new Chart 생성!")
  }
};
</script>
