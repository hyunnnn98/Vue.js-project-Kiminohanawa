<template>
  <v-app id="app">
  <v-card id="home">
    <!-- 메인메뉴 card-box (vTabs) -->
    <v-card-title id="header" class="text-center justify-center py-1 px-0">
      <a href="./"><img src="./imgs/logo.png" alt=""/></a>
      <v-tabs v-model="tab" color="main_Bcg">
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-card-title>
    <!-- 메인메뉴 card-box (vTabs) -->

    <!-- 메인template card-box (vTabsItems) -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card v-if="item === items[0]" flat color="main_Bcg">
          <v-card-text id="p1_Bcg">
            <page1></page1>
          </v-card-text>
        </v-card>
        <v-card v-else-if="item === items[1]" flat color="main_Bcg">
          <v-card-text id="p2_Bcg">
            <page2></page2>
          </v-card-text>
        </v-card>
        <v-card v-else-if="item === items[2]" flat color="main_Bcg">
          <v-card-text id="p3_Bcg">
            <page3></page3>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!-- 메인template card-box (vTabsItems) -->
  </v-card>
  <div id="footer">Copyright © YJU WDJ Bokvengers. All rights reserved.</div>
  </v-app>
</template>

<script>
import page1          from "../src/components/page1";
import page2          from "../src/components/page2";
import page3          from "../src/components/page3";
import css_Normalize  from "../src/css3/css_Normalize.css";
import home_Style     from "../src/css3/home_Style.css";
import page1_Style    from "../src/css3/page1_Style.css";
import page2_Style    from "../src/css3/page2_Style.css";
import page3_Style    from "../src/css3/page3_Style.css";
import Chart          from "chart.js";


export default {
  components: {
    page1,
    page2,
    page3
  },
  data() {
    return {
      tab   : null,
      data1 :"",
      items : ["실시간조회", "과거이력조회", "리모컨"],
    };
  },
  computed: {},
  methods: {
  },
};
</script>