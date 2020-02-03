import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// ================== 서비스 워커 설정 =====================
// let swRegistration = null; // 서비스 워크로부터 성공 했을 시 활성되는 변수.
// // applicationServerPublicKey === 내 퍼블릭 키 (파이어베이스 서버 키)
// const applicationServerPublicKey = 'AAAALyEFKgM:APA91bG9Mm1abdGsdzPF3xlmwHS0Q-Z6FvoUyiu0HhLICr2cY-MrnZaPZCMvAd6nXRIrge3Jz6fz5iP7asGnGRAtc3WIT8zmit72i1X9bHDWWU9CE0Zxzj_742h07BAczRS18Kx5ZTUn';
// let alarmAllow = false; // 사용자로 부터 알람 허가 버튼

// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   console.log('Service Worker and Push is supported');

//   // 서비스 워커 로딩 후 > service-worker.js파일로 들어간 후 접속 / 오류로 판단하여 다음 문장 실행
//   navigator.serviceWorker.register('service-worker.js')
//     .then(function (swReg) {
//       // 서비스워크를 불러왔을 시 수행되는 문장.
//       console.log('Service Worker is registered', swReg);
//       swRegistration = swReg;
//     })
//     .catch(function (error) {
//       console.error('Service Worker Error', error);
//     });
// } else {
//   console.warn('서비스 워커를 통한 푸쉬메세지를 사용할 수 없습니다.');
// }


// ====================== 파이어베이스로부터 연동 ===========================
// import * as firebase from 'firebase/app';
// import 'firebase/messaging';

// var config = {
//   apiKey: "AIzaSyBvo_PpzphyuDmMMDSRJGPiUO5FLchWtYM",
//   authDomain: "vue-kiminohanawa.firebaseapp.com",
//   databaseURL: "https://vue-kiminohanawa.firebaseio.com",
//   projectId: "vue-kiminohanawa",
//   storageBucket: "vue-kiminohanawa.appspot.com",
//   messagingSenderId: "202417449475",
//   appId: "1:202417449475:web:a6f8f4e3cbfb1039aabc36"
// }; // 4. Get Firebase Configuration
// firebase.initializeApp(config);

// const messaging = firebase.messaging();

// messaging.usePublicVapidKey("BEcE7u9DxENd25OPxu70kT8m43m2ON81y_THmJ_-JaCokc59nwt7ynq3NEywVl_31wEB5A5uUWh5TiVxVKStCvg"); // 1. Generate a new key pair

// // Request Permission of Notifications
// messaging.requestPermission().then(() => {
//   console.log('파이어베이스 Notification permission granted.');

//   // Get Token
//   messaging.getToken().then((token) => {
//     // 토큰을 받아서 콘솔창에 토큰 출력.
//     console.log("==== 파이어베이스로부터 받은 토큰 값 ====")
//     console.log(token)
//     console.log("==== 파이어베이스로부터 받은 토큰 값 ====")
//   })
// }).catch((err) => {
//   console.log('Unable to get permission to notify.', err);
// });