<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <span id="p1_textDanger" v-on="on">{{levelTxt_co2}}</span>
      </template>
      <div id="p1_tooltipON">
        <p id="p1_tootlipSensorTxt">이산화탄소 (CO2)</p>
        <div><p id="p1_tooltipRed"></p> : 매우 나쁨 (2000~)</div>
        <div><p id="p1_tooltipYellow"></p> : 나쁨 (1000~)</div>
        <div><p id="p1_tooltipGreen"></p> : 보통 (700~)</div>
        <div><p id="p1_tooltipBlue"></p> : 좋음 (0~)</div>
      </div>
    </v-tooltip>
    <canvas id="chart_co2" width="90px" height="230"></canvas>
  </div>
</template>

<script>
import chartjs_co2 from "../chartjs/chartjs_p1_co2.js";

export default {
  props: ["chart_co2_data"],
  methods: {
  },
  data() {
    return {
      chartjs_co2    : chartjs_co2,
      chartValue     : "",
      levelTxt_co2   : "",
    };
  },
  watch: {
    chart_co2_data: function() {
      this.chartjs_co2.__ob__.value.data.datasets[0].data[0] = this.chart_co2_data[5][0];
      const realTimeValue = this.chart_co2_data[5][0];
      // 위험지수 level TXT 표시 & value에 따라 색상 변경
      if(realTimeValue >= 2000) {
          this.chartjs_co2.__ob__.value.data.datasets[0].backgroundColor = 'rgb(248, 45, 45)'
          this.levelTxt_co2 = "매우 나쁨"
      }else if(realTimeValue >= 1000) {
          this.chartjs_co2.__ob__.value.data.datasets[0].backgroundColor = 'rgb(255, 164, 28)'
          this.levelTxt_co2 = "나쁨"
      }else if(realTimeValue >= 700) {
          this.chartjs_co2.__ob__.value.data.datasets[0].backgroundColor = 'rgb(34, 168, 52)'
          this.levelTxt_co2 = "보통"
      }else {
          this.chartjs_co2.__ob__.value.data.datasets[0].backgroundColor = 'rgb(48, 66, 228)'
          this.levelTxt_co2 = "좋음"
      }
      this.chartValue.update();
      // console.log("p1 co2에서 호출함!  : " + this.chart_co2_data[5][0]); // 프롭스를 통해 data값 잘 받아짐
    }
  },
  mounted: function() {
    const crt_co2 = document.getElementById("chart_co2");
    this.chartValue = new Chart(crt_co2, {
        type:        chartjs_co2.type,
        data:        chartjs_co2.data,
        options:     chartjs_co2.options
      });
    // console.log("p1 - co2 new Chart  생성!")
  }
};
</script>