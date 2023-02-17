[2023-02-13]

# 1. Describing the UI

### React?
- UI 렌더링 라이브러리이다.
- UI들을 재사용 가능하고 중첩 가능한 컴포넌트로 합성할 수 있다.
  
  (UI: 버튼, 텍스트, 이미지들과 같은 작은 단위로 구성되어져 있다.)


----
## 1.1 Your first `component`
리액트 애플리케이션은 component라 불리는 독립된 UI조각들로 구성되어져 있다.
리액트 component는 마크업을 뿌려주는 js 함수이다.


`App.js`
> 3개의 `Profile` component를 렌더링하는 `Gallery` component이다.
```js
function Profile() {
  return (
    <img 
      src="경로"
      alt="alt 값"
    />
  )
}

export default function Gallery() {
  return (
    <section>
      <Profile />
      <Profile />
      <Profile />
    </section>
  )
}
```

### 1.1.1 Component
* 컴포넌트는 무엇인가?
  * 리액트의 핵심 개념 중 하나.
* 리액트에서의 컴포넌트의 역할
  

> 앱에서 재사용 가능한 UI 요소인 사용자 정의 컴포넌트로 결합할 수 있다.


#### 1) Defining Component
컴포넌트 정의하기
```js
export default function Profile() {
  return (
    <img 
      src="경로"
      alt="alt 값"  
    />
  )
}

```
#### 2) Build a Component
컴포넌트 빌드하기

`step 1: 컴포넌트 export 하기`
  - 접두사 `export default` 를 사용하면 다른 파일에서 가져올 수 있다.

`step 2: 함수 정의`
  - `function Profile() { }`를 사용하여 정의한다.

`step 3: 마크업 추가`
  - `return`과 같은 줄에 있다면 한 줄에 모두 작성할 수 있다.
    ```js
      return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
    ```
  - `return`과 같은 줄에 있지 않다면, 괄호로 묶어준다.
    ```js
      return (
        <div>
          <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
        </div>
      );
    ```

    > 😭 괄호가 없으면 return 뒤에 있는 모든 코드는 무시된다.

#### 3) Using Component
컴포넌트 사용하기
정의한 컴포넌트 내부에서 중첩하여 다른 컴포넌트를 사용할 수 있다.

`브라우저에서는 어떻게 보일까?`  
* `<section>` 과 같이 소문자일 경우, HTML tag로 인식
* `<Profile />` 과 같이 첫글자는 대문자로 써야 컴포넌트로 인식


`컴포넌트 정의는 최상단에서 한다.`
* 컴포넌트를 정의할 때, 내부에서 정의하면 안 된다.
    ```js
    export default function Gallery() {
        // 🔴 Never define a component inside another component!
        function Profile() {
            // ...
        }
        // ...
    }
    ```
* 최상단에서 정의해야 한다.
    ```js
    export default function Gallery() {
        // ...
    }

    // ✅ Declare components at the top level
    function Profile() {
        // ...
    }
    ```

-----
<br>
<br>

# 2.Importing and Exporting Components
2-1. 루트 컴포넌트 파일이란?  
2-2. 컴포넌트 import, export  
2-3. default나 명명된 import, export를 사용하는 경우  
2-4. 하나의 파일에서 여러 컴포넌트를 import, export하는 방법
2-5. 컴포넌트를 여러 파일로 분할하는 방법


### 컴포넌트의 특징
* 재사용성 (reusability)

-----

## 2-1. 루트 컴포넌트 파일
CRA에서 src/App.js
설정에 따라 다른 파일에 있을 수 있음.

## 2-2. 컴포넌트 import, export
`import Gallery from './Gallery';`

## 2-3. `Default` VS `named exports`

Syntax | Export statement | Import statement
--|--|--
Default	| export `default` function Button() {} | import Button from './button.js';
Named(명명된)	| export function Button() {} | import `{` Button `}` from './button.js';



### 디버깅이 어려워 비추하는 방식  
`export default () => {}`


-----
<br>
<br>

# 3. JSX
3-1. React에서 마크업과 렌더링 로직을 혼합하는 이유?  
3-2. JSX vs. HTML  
3-3. JSX로 정보를 표시하는 방법  


* JSX?   
    js 파일에서 html과 유사하게 마크업을 작성할 수 있게 해주는 js용 구문 확장자 (syntax extension)

* JSX는 html처럼 보이지만 내부적으로 일반 js객체로 변환된다.  
그래서 `<></>` 태그로 래핑을 해줘야만 반환할 수 있다.

* `aria-*` 나 `data-*` 는 `-(대쉬)`를 사용하여 HTML에서와 같이 그대로 쓴다.


-----
<br>
<br>

# 4. Curly Braces `{}`
마크업 안에 js 로직을 추가하거나 동적 프로퍼티를 참조할 때 사용한다.

### 중괄호를 사용하는 위치  
* 2 가지 방법으로 사용할 수 있다.  
1. `<h1>{이렇게}</h1>`  
2. 속성의 값 `src={img}`

### 이중괄호를 사용하여 객체 형식으로 사용
=> 진짜 객체이다.  

```jsx
person = {
    {
        name: "beat beat",
        age: 15
    }
}
```
* 스타일 줄 때도 이중괄호 사용
```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black', // 카멜케이스 사용
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

