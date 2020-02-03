<template>
  <div id="app">
    <div id="p2_graphDay"> {{ graphDay }}  </div>
    <div id="p2_pastBtnBox">
      <v-btn id="p2_pastSelectBtn" small depressed @click="p2_changeChartCSS('CO2')">
        <div id="p2_icon_co2"></div>이산화탄소
      </v-btn>
      <v-btn id="p2_pastSelectBtn" small depressed @click="p2_changeChartCSS('PM2.5')">
        <div id="p2_icon_pm25"></div>초미세먼지
      </v-btn>
      <v-btn id="p2_pastSelectBtn" small depressed @click="p2_changeChartCSS('PM10')">
        <div id="p2_icon_pm10"></div>미세먼지
      </v-btn>
    </div>
    <canvas id="p2_chart_pastAvg"></canvas>
  </div>
</template>

<script>
import chartjs_pastAvg from "../chartjs/chartjs_p2_pastAvg";

export default {
  props: ["p2_chart_data", "graphDay"],
  methods: {
    setChartCSS(sensor, backgroundColor, borderColor){
      chartjs_pastAvg.data.datasets[0].label                        = sensor;
      chartjs_pastAvg.__ob__.value.data.datasets[0].backgroundColor = backgroundColor;
      chartjs_pastAvg.__ob__.value.data.datasets[0].borderColor     = borderColor;
    },
    p2_changeChartCSS(sensor) {
      this.selectPastChart = sensor; // 센서값 복사
      // console.log(`p2_crt_pastAvg : 센서값 ${this.selectPastChart}로 변경 요청!`);
      // 이름 && 색상 && y축 change
      if (sensor == "CO2") {
        this.setChartCSS(sensor,  'rgba(32, 143, 235, 0.3)', 'rgba(32, 143, 235, 1)')
      } else if (sensor == "PM2.5") {
        this.setChartCSS(sensor,  'rgba(255, 99, 132, 0.3)', 'rgba(255, 99, 132, 1)');
      } else if (sensor == "PM10")  {
        this.setChartCSS(sensor,  'rgba(34, 168, 45, 0.3)', 'rgba(34, 168, 45, 1)');
      }
      this.updateChart(sensor);
    },

    updateChart(sensor){
      for (let i = 0; i < 24; i++) {
        if (sensor == "CO2") {
          this.chartjs_pastAvg.__ob__.value.data.datasets[0].data[i] = this.p2_chart_data[i][0];
        } else if (sensor == "PM2.5") {
          this.chartjs_pastAvg.__ob__.value.data.datasets[0].data[i] = this.p2_chart_data[i][1];
        } else if (sensor == "PM10") {
          this.chartjs_pastAvg.__ob__.value.data.datasets[0].data[i] = this.p2_chart_data[i][2];
        }
      }
      this.p2_chartValue.update();
    }
  },
  data() {
    return{
      chartjs_pastAvg   : chartjs_pastAvg,
      selectPastChart   : "",
      p2_chartValue     : "",
    };
  },
  mounted() {
    // co2 sensor값으로 초기 CSS 셋팅. (co2 sensor로 이름, graph컬러변경)
    this.setChartCSS('CO2', 'rgba(32, 143, 235, 0.3)', 'rgba(32, 143, 235, 1)')
    // 초기값 셋팅
    for (let i = 0; i < 24; i++) {
      this.chartjs_pastAvg.__ob__.value.data.datasets[0].data[i] = this.p2_chart_data[i][0];
    }

    const crt_PastAvg = document.getElementById("p2_chart_pastAvg");
    this.p2_chartValue = new Chart(crt_PastAvg, {
      type:     chartjs_pastAvg.type,
      data:     chartjs_pastAvg.data,
      options:  chartjs_pastAvg.options
    });
    
    // console.log("p2_crt_pastAvg : chartjs_pastAvg 생성!");
  },
};
</script>