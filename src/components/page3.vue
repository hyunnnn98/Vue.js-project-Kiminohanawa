<template>
  <div class="page3" id="app">
    <div>
      <img id="p3_remoteImg" src="../imgs/television.png" alt="">
      <p id="p3_mainTxt">키미노하나와</p>
      <p id="p3_mainTxt">디스플레이 제어 리모컨</p>
    </div>
    <div id="remoteControl">
      <div id="box_speker"></div>
      <div id="btn_mainBox">
      <div id="btn_Menu_power" @click="btnControl('0')" ><img id="p3_powerImg" src="../imgs/power_btn.png" alt=""></div>
        <div id="btn_Menu_co2" @click="btnControl('1')">CO2</div>
        <div id="btn_Menu_pm10" @click="btnControl('3')">PM10</div>
        <div id="btn_Menu_pm25" @click="btnControl('2')">PM2.5</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    btnControl(signal) {
      console.log(`p3) User -> ${signal} -> Display !`)
      const btn_power  = document.getElementById("btn_Menu_power").style
      const color_off  = 'rgb(100, 100, 100)'
      const color_on   = 'rgb(190, 28, 28)'

      if(signal === '0') {
        // 전원이 꺼져있을 때 (off -> on )
        (btn_power.borderColor == color_off) ? btn_power.borderColor = color_on : btn_power.borderColor = color_off
      } else {
        btn_power.borderColor = color_off
      }
      axios
        .post("http://13.124.189.186/php/displayChange.php", {display : signal * 1})
        .then(res => {
          // console.log(`signal값:`, signal)
          // console.log(`display 전송 값`, res);
        })
        .catch(err => {
          console.log(`error 발생.`,err)
          alert("display 신호를 수신할 수 없습니다.")
        })
    }
  },
  data() {
    return {};
  }
};
</script>
