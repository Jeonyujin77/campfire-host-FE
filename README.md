# ⛺캠프파이어 호스트 웹페이지

```
캠핑파이어는 쉽고 편리한 캠핑장 예약 시스템 입니다.
캠핑, 글램핑, 카라반 등등 고객이 원하는 캠핑장만 골라서 보여주며 지역검색으로 원하는 지역의 캠핑장을 찾을 수 있습니다.
호스트 웹페이지에서는 캠핑장 사장님들이 직접 캠핑장 및 각 캠핑장 사이트, 캠핑장 관련 키워드를 등록할 수 있으며 예약관리도 할 수 있습니다.
```

## 기술스택
- React
- TypeScript
- library
    - @emotion/react
    - @emotion/styled
    - @mui/icons-material
    - @mui/material
    - @reduxjs/toolkit
    - axios
    - react-daum-postcode: 주소찾기
    - react-redux
    - react-dom
    - react-router-dom

## 화면기능
- 예약관리: /reserve-manage
- 캠핑장관리: /camp-manage
- 캠핑장상세: /camps/:campId
- 사이트관리: /site-manage
- 캠핑장별사이트조회: /site-manage/:campId
- 사이트상세: /sites/:campId/:siteId
- 키워드관리: /keyword-manage
- 키워드상세: /keyword-manage/:campId
- 프로필편집: /hostpage
- 회원가입: /signup
- 로그인: /signin

## 노션주소
<https://www.notion.so/deepsea-human/SA-4-b0e895564177427194ad966ac588dee7>
