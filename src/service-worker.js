// 'use strict';

// self.addEventListener('push', function (event) {
//     console.log('[Service Worker] Push Received.');
//     console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

//     const title = '키미노하나와';
//     const options = {
//         body: '경고 알림 테스트중..',
//         icon: './imgs/icon.png',
//         badge: './imgs/badge.png',
//     };

//     const notificationPromise = self.registration.showNotification(title, options);
//     event.waitUntil(notificationPromise);
// });

// // self.addEventListener('push', ......);
// // selft는 서비스 워커 자체를 참조한다. 따라서 서비스워커에 이벤트 리스터를 추가한다는 의미.

// self.addEventListener('notificationclick', function (event) {
//     console.log(' [Service Worker] Notification click Received.');

//     event.notification.close();

//     event.waitUntil(
//         clients.openWindow('http://bokvengers.s3-website.ap-northeast-2.amazonaws.com')
//     );
// });