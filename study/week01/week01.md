# 컴포넌트

컴포넌트: 재사용가능한 사용자 정의의 마크업,css,자바스크립트를 ui요소로 만든것,
일반자바스크립트 함수에 포함

장점 : 컴포넌트를 사용하여 개발을 효율적으로 할 수 있으며 코드를 줄 일 수 있다.

주의점 : 리액트 컴포넌트는 일반 자바스크립트 함수이지만 이름이 대문자로 시작해야한다.

## 컴포넌트 중첩 및 구성

- 일반 자바스크립트 함수 같은파일에 여러개 컴포넌트를 가질 수 있다. 상대적으로 작거나 연관된 컴포넌트일때 사용.
- 하지만 한파일에 여러 컴포넌트를 가질시 규모가 크고 다른컴포넌트와 연결관계가 있다면 분류해놓는게 유지보수에 좋다.
- 주의점 : 컴포넌트 내에 다른컴포넌트를 렌더링 가능하나 중첩해서 사용하면 느리고 버그를 유발할수 있다. 대신에 최상위에서 모든 컴포넌트를 정의할 것

        export default function Gallery() {
          // 🔴 Never define a component inside another component!
          function Profile() {
            // ...
          }
          // ...
          }

  ## root 컴포넌트 파일

- React 애플리케이션은 "루트" 컴포넌트에서 시작되며 설정에 따라 다른파일에 있을 수 있다.

- 기본 내보내기와 지정된 내보내기 :  
   기본내보내기 (default) : 가져오기 뒤에 원하는 이름을 넣어도 작동
  지정된 내보내기(named): export와 imoprt의 이름이 동일해야한다

        예시 )
        default : (대부분 하나의 파일에 하나의 컴포넌트만)
         export default function Profile()  {}
         import abcd(별칭) form  './Profile.js'

       named : (여러컴포넌트와 값을 내보내는경우)
         export function Profile()  {}
         import {Profile} form  './Profile.js'

       ** 기본형은 {중괄호} 없이, name형은 {}안에
          export default function Profile()  {}
          export function ImgContent ()  {}
          import Profile, { ImgContent } form './Profile.js';

       ** named도 별칭을 쓰려면 as를 통해서도 가능 하다.

  ## JSX로 마크업 작성

  JSX : javascript XML 로 렌더링과 마크업을 같이한다.

- 렌더링 로직과 마크업을 함께 유지하면 편집할 때마다 서로 동기화 상태를 유지할 수 있다.
- 내부적으로는 일반 JavaScript 객체로 변환되기때문에 <></>와같이 하나의 태그로 묶는것
- 대부분 카멜케이스로 className과 같이 어트리뷰트가 작성되지만 aria-_ 및 data-_ 속성은 대시를 사용하여 HTML에서와 같이 작성한다

## 중괄호와 JSX의 자바스크립트
--- 
- "이중 중괄호" 사용 :  <br>
1. JSX에서 JS 객체를 전달하려면 다른 중괄호 쌍으로 객체를 감싸야 합니다 <br>
 ex) person={{ name: "Hedy Lamarr", inventions: 5 }} <br>
2. JSX의 inline CSS 스타일 : <br>

       <ul style={{ backgroundColor: 'black', color: 'pink' }}> </ul>