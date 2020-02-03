<!-- <link href="https://fonts.googleapis.com/css?family=Bebas+Neue|Sawarabi+Mincho&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Yeon+Sung:400" rel="stylesheet">

<h1 align="center" style="font-family: 'Sawarabi Mincho', sans-serif">Kiminohanawa : 君の鼻は</h1>
<h2 align="center" style="font-family: 'Bebas Neue', cursive">Bokvengers : 2nd team project</h2>

<h2 align="center" style="font-family: 'Yeon SUng'">Front End : 김범수, 조승현<br>
    Back End : 이인준, 이주용, 정재순</h2> -->

# Kiminohanawa : 君の鼻は
> ##  Bokvengers : 2nd team project
> ### Front End : 김범수, 조승현
> ### Back End : 이인준, 이주용, 정재순
---
> ### 🔎 프로젝트 기획의도
>> #### ❗️ 강의실 내 대기질 관리의 필요성 대두
>> - ##### 다수의 인원이 강의실 내에서 장시간 환기 없이, 질 나쁜 공기에 노출
>> - ##### 학습 간에 쉽게 답답함, 피로감 등을 느끼고, 이로 인한 학습 효율 저하
>> - ##### 환기의 중요성을 부각
>> #### ❗️ 대기 오염에 대한 관심 증가
>> - ##### "실내 공기는 안전할까?" 에 대한 궁금증 증가
>> - ##### 건강 관리를 위해, 비염, 폐렴 등 호흡기 질환자 이외의 일반인의 관심 급증
> #### 👉 실내 "CO2, PM10, PM2.5" 를 측정, 사용자에게 전달, 알림을 통해 환기를 유도

---
> ### 🏢 프로젝트 설계
>> #### ❗️ 개인별 관심분야를 중점으로 역할(Front End, Back End) 분담
>> <img src="https://user-images.githubusercontent.com/53788601/73654281-a265a880-46ce-11ea-9138-78b416254de9.PNG" width="80%">
>>
>> #### ❗️ 전체적인 프로젝트에 진행에 대하여 토의
>> - #### Development Language
>> <img src="https://user-images.githubusercontent.com/53788601/73654226-7c400880-46ce-11ea-81fe-279c22fe9787.png" width="80%">
>>
>> - #### Service Flow
>> <img src="https://user-images.githubusercontent.com/53788601/73654287-a5609900-46ce-11ea-8258-d0b92b2c75c3.png" width="80%">
>>
>> - #### Systems Architecture
>> <img src="https://user-images.githubusercontent.com/53788601/73654289-a5609900-46ce-11ea-9882-54bd9f8449a2.png" width="80%">
> #### 👉 교실의 대기 질(CO2, 미세먼지, 초미세먼지)을 측정하여 Display를 통해 출력
> #### 👉 위험 수치 기준을 넘을 시, LED를 통한 사용자에게 경고 전달
> #### 👉 Web page / Application을 통해 실시간 측정값, 과거 이력 조회, 리모컨 기능 추가

---
>### 💻 프로젝트 개발 과정
> #### ❗️ Front End
> #### ❗️ Back End

---
> ### 🔎 Kiminohanawa 세부 서비스 소개
>> #### 📡 Hard Ware
>> - ##### 센서를 통해 측정된 값(CO2, 미세먼지, 초미세먼지) 을 Display에 표현
>> - ##### 일정기준을 초과할 시, LED를 통해 사용자에게 전달
>> - ##### Touch 또는 Web Site를 통해 Display 조작
>
>> #### 🌐 Web Site
>> ##### ❗️ 실시간 조회
>> - ##### 1분 단위, 평균 값(CO2, 미세먼지, 초미세먼지) 을 제공
>> <img src = "https://user-images.githubusercontent.com/53788601/73658144-2b80dd80-46d7-11ea-8fa6-c7fea6b6b7dd.PNG" width = "50%">
>>
>> - ##### 상세 조회 시, 5시간 이전(현시간 기준) 평균 값을 Chart로 표현
>> <img src = "https://user-images.githubusercontent.com/53788601/73657244-36d30980-46d5-11ea-87b7-96b986811c7f.PNG" width = "50%">
>>
>> #### ❗️ 과거이력 조회
>> - ##### 사용자가 원하는 주차를 선택 시, 해당 주차의 일별 최대, 최솟값을 조회
>> <img src = "https://user-images.githubusercontent.com/53788601/73657614-f9bb4700-46d5-11ea-9447-3b05508b0267.PNG" width = "50%">
>>
>> - ##### 각 요일을 선택 시, 해당 일에 대한 1시간 단위 평균 값을 Chart로 표현
>> <img src = "https://user-images.githubusercontent.com/53788601/73657606-f627c000-46d5-11ea-9426-948d74eac23e.PNG" width = "50%">
>>
>> #### ❗️ 리모컨
>> - ##### 사용자가 리모컨을 통하여, Display 조작
>> <img src = "https://user-images.githubusercontent.com/53788601/73657247-39cdfa00-46d5-11ea-992f-e3223917c838.PNG" width = "50%">
