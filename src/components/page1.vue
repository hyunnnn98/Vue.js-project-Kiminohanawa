<template>
  <div class="page1" id="app">
    <v-switch v-model="themChange" color="white" :label="`테마변경`"></v-switch>
    <div id ="p1_textBox">
    <p id="p1_time">현재시간 {{ serverTime.getHours()+"시 "+serverTime.getMinutes()+"분 "+serverTime.getSeconds()+"초"}}</p>
    <p id="p1_mainTxt">우리 <strong>교실 공기 관리 상태</strong>는 <strong>안전</strong>할까?</p>
    <p id="p1_subTxt">우리 교실 공기관리 상태를 확인하고</p>
    <p id="p1_subTxt">공기관리에 대한 TIP을 확인해보세요.</p>
    <p id="p1_mobileTxt">[ YJU WDJ 401호 강의실 ]</p>
    <p id="p1_mobileTxt">공기관리에 대한 TIP을 확인해보세요.</p>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <span id="p1_tooltipMain" v-on="on"><p id="p1_tooltipTxt">TIP</p></span>
      </template>
      <div id="p1_tooltipIcon">
        <div>
          <p id="p1_tooltipRed"></p>  공기청정 TIP 설명 예정!!
        </div>
      </div>
    </v-tooltip>
    </div>
    <!-- 메인 v-card -->
    <v-card id="page1_mainBox" :class="`d-flex justify:center mb-2`" flat tile>
      <!-- 각 센서 v-card(3) -->
      <v-card id="page1_GraphBox" class="pa-2" outlined tile>
        <chart1_co2 :chart_co2_data="chart_data"></chart1_co2>
        <p id="GraphValue">이산화탄소</p>
      </v-card>

      <v-card id="page1_GraphBox" class="pa-2" outlined tile>
        <chart1_pm25 :chart_pm25_data="chart_data"></chart1_pm25>
        <p id="GraphValue">초미세먼지</p>
      </v-card>

      <v-card id="page1_GraphBox" class="pa-2" outlined tile>
        <chart1_pm10 :chart_pm10_data="chart_data"></chart1_pm10>
        <p id="GraphValue">미세먼지</p>
      </v-card>

    </v-card>
    <!-- 상세조회 버튼 -->
    <v-btn
      id="page1_detailBtn"
      small
      dark
      @click="showDetailChart"
      >상세조회</v-btn
    >
    <!-- 버튼 활성화 시 display: on -->
    <div id="page1_realTimeBcg" v-if="show_Detail">
      <chart1
        id="crt_RealTime"
        :chart_data = "chart_data"
      ></chart1>
    </div>
  </div>
</template>

<script>
import chart1         from "./p1_crt_avg";
import chart1_co2     from "./p1_crt_co2";
import chart1_pm25    from "./p1_crt_pm25";
import chart1_pm10    from "./p1_crt_pm10";
import axios          from "axios";

export default {
  components: {
    chart1,
    chart1_co2,
    chart1_pm25,
    chart1_pm10
  },
  data: () => ({
    justify         : ["center"],
    show_Detail     : false, // realtime set boolean data
    themChange      : false, // alarm set boolean data
    chart_data      : "",
    levelTxt_pm10   : "",
    serverTime      : new Date(),
  }),
    methods: {
    showDetailChart() {
      // realtime char load
      this.show_Detail === true ? (this.show_Detail = false) : (this.show_Detail = true);
    },
    setSeverTime() {
      setInterval(() => {
        this.serverTime = new Date();
      }, 1000);
    },
    setNewSensorData() {
      axios
        .get("http://13.124.189.186/php/call_realtimedata.php")
        .then(res => {
          this.chart_data = res.data;
          // console.log("page1 : sensor값 셋팅!", res);
        })
        .catch(err => {
          // console.log("page1 : 서버로부터 통신 불가..", err);
        })
    }
  },
  mounted: function() {
    // 초기 data 받는 axios
    this.setNewSensorData()

    // 1분에 한번씩 받는 데이터
    const schedule = require('node-schedule')
    const dataReload = schedule.scheduleJob('5 */1 * * * *', () => {
    // 실시간 data reloading axios
      this.setNewSensorData()
    });

    // 서버 시간 함수 실행
    this.setSeverTime()
  },
  watch: {
    themChange: function() {
      const page1_BackGround = document.querySelector('#p1_Bcg')
      const page2_BackGround = document.querySelector('#p2_Bcg')
      const page3_BackGround = document.querySelector('#p3_Bcg')
      const page1_Time       = document.querySelector('#p1_time')
      const page1_detailBtn  = document.querySelector('#page1_detailBtn')
      const page2_subTxt     = document.querySelector('#p2_searchWindow')

      if(this.themChange === true) {
        // console.log('테마 변경')
        page1_BackGround.style.backgroundColor = '#3a3a3a';
        page2_BackGround.style.backgroundColor = '#3a3a3a';
        page3_BackGround.style.backgroundColor = '#3a3a3a';
        page1_Time.style.backgroundColor       = '#3a3a3a';
        page1_detailBtn.style.backgroundColor  = '#3a3a3a';
        page2_subTxt.style.color               = "white";

      } else {
        page1_BackGround.style.backgroundColor = '#4dbddd';
        page2_BackGround.style.backgroundColor = '#4dbddd';
        page3_BackGround.style.backgroundColor = '#4dbddd';
        page1_Time.style.backgroundColor       = '#4dbddd';
        page1_detailBtn.style.backgroundColor  = '#4dbddd';
        page2_subTxt.style.color               = "black";
      }
    }
  }

};
</script>
