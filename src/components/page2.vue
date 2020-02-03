<template>
  <div class="page2">
    <!-- 검색 조건 불충분 메서드 호출-->
    <div id="p2_searchWindow">
      <!-- (searchDate[0] : 년, searchDate[1] : 월, searchDate[2] : 주차) - form 태그  -->
      <v-form id="myForm" @submit.prevent="sendPost">
        <select id="p2_years_choose" v-model="searchDate[0]">
          <option>2020</option>
        </select>
        <p id="p2_selectText">년</p>
        <select id="p2_months_choose" v-model="searchDate[1]">
          <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
          <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>
          <option>11</option><option>12</option>
        </select>
        <p id="p2_selectText">월</p>
        <select id="p2_weeks_choose" v-model="searchDate[2]">
          <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
        </select>
        <p id="p2_selectText">주차</p>
        <v-btn id="p2_choose_date" depressed small color="white" type="submit">검색</v-btn>
      </v-form>
    </div> 

    <p id="p2_mainTxt">요일을 누르시면 그래프가 나옵니다.</p>
    <!-- 과거 Table 생성 -->wqw
    <table id="page2_table">
      <thead id="page2_t_head">
        <tr>
          <th>요일        </th>
          <th>이산화탄소  </th>
          <th>초미세먼지  </th>
          <th>미세먼지    </th>
        </tr>
      </thead>
      <tbody id="page2_t_body">
        <!-- for문 반복. 기준은 daysOftheWeek의 배열 개수, key는 days(요일) -->
        <tr v-for="item in daysOftheWeek" :key="item.days" >
          <td>  <div @click="findKey(item.days)" id="p2ShowGraph">{{ item.days }} </div> </td>
          <td>  <div> <p id="p2_co2_value">   {{ item.sensorValue_co2  }}  </p>                        </div> </td>
          <td>  <div> <p id="p2_pm25_value">  {{ item.sensorValue_pm25 }}  </p>                        </div> </td>
          <td>  <div> <p id="p2_pm10_value">  {{ item.sensorValue_pm10 }}  </p>                        </div> </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selected" id="pastGp">
      <chart2 id="crt_PastTime" :p2_chart_data="p2_chart_data" :graphDay="graphDay"></chart2>
    </div>
  </div>
</template>

<script>
import chart2 from "./p2_crt_pastAvg.vue";
import axios from "axios";

export default {
  components: {
    chart2
  },
  methods: {
    sendPost() {
      if (this.searchDate[0].year === "" || this.searchDate[1].months === "" || this.searchDate[2].weeks === "") {
          alert("날짜를 다시 입력하세요");
      }else {
          const formData = {
            year    : this.searchDate[0],
            months  : this.searchDate[1],
            weeks   : this.searchDate[2]
          };
          axios
            .post("http://13.124.189.186/php/lookup_pastdata.php", formData)
            .then(res => {
              for (let i = 0; i < 7; i++) {
                this.daysOftheWeek[i].sensorValue_co2   = res.data[i][0] + " / " + res.data[i][1];
                this.daysOftheWeek[i].sensorValue_pm25  = res.data[i][2] + " / " + res.data[i][3];
                this.daysOftheWeek[i].sensorValue_pm10  = res.data[i][4] + " / " + res.data[i][5];
                }
                this.copyArray = res;
                // console.log("page2 : Post 방식 Min·Max값 세팅 ", res.data);
              }
            )
            .catch(err => {
              console.log("data load error");
        });
      }
    },
    findKey(keyString) {
      if (keyString.length === 1 && this.copyArray != "") {
        let searchDay = (keyString) => {
          let copyDay = "";
          if (keyString === "일") {
            copyDay = this.copyArray.data[0][6];
          } else if (keyString === "월") {
            copyDay = this.copyArray.data[1][6];
          } else if (keyString === "화") {
            copyDay = this.copyArray.data[2][6];
          } else if (keyString === "수") {
            copyDay = this.copyArray.data[3][6];
          } else if (keyString === "목") {
            copyDay = this.copyArray.data[4][6];
          } else if (keyString === "금") {
            copyDay = this.copyArray.data[5][6];
          } else if (keyString === "토") {
            copyDay = this.copyArray.data[6][6];
          }
          return copyDay;
        };
        this.graphDay = searchDay(keyString)
        // console.log("searchDay :",searchDay(keyString))
        axios
          .post("http://13.124.189.186/php/callgraph_pastdata.php", {day: searchDay(keyString)})
          .then(res => {
            this.p2_chart_data = res.data;
            this.selected === true ? (this.selected = false) : setTimeout(() => { (this.selected = true) },800);
          })
          .catch(error => {
            console.log("data load error");
          });
      } else {
        alert("날짜를 입력해주시기 바랍니다.")
      }

    },
  },
  data: () => ({
      selected       : false, // 과겨이력조회 display boolean data
      days           : "",    // 요일 data
      copyArray      : "",    // 검색 click 각 센서 최대 최솟값 data 
      p2_chart_data  : "",    // send p2_crt_pastAvg.vue data
      graphDay       : "",    // graph print day
      searchDate     :[{  year: "" }, { months: "" }, { weeks: "" }],
      daysOftheWeek  : [
        {
          days: "일",
          sensorValue_co2: "",
          sensorValue_pm25: "",
          sensorValue_pm10: "",
        },
        {
          days: "월",
          sensorValue_co2: "",
          sensorValue_pm25: "",
          sensorValue_pm10: "",
        },
        {
          days: "화",
          sensorValue_co2: "",
          sensorValue_pm25: "",
          sensorValue_pm10: "",
        },
        {
          days: "수",
          sensorValue_co2: "",
          sensorValue_pm25: "",
          sensorValue_pm10: "",
        },
        {
          days: "목",
          sensorValue_co2: "",
          sensorValue_pm25: "",
          sensorValue_pm10: "",
        },
        {
          days: "금",
          sensorValue_co2: "",
          sensorValue_pm25: "",
          sensorValue_pm10: "",
        },
        {
          days: "토",
          sensorValue_co2: "",
          sensorValue_pm25: "",
          sensorValue_pm10: "",
        }
      ]
  }),
};
</script>