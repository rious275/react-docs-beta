# Render and Commit

## Trigger
렌더링되는 이유
1. 초기 렌더링
2. 컴포넌트(또는 조상중 하나)의 상태가 업데이트 된 경우

### 초기화
기존엔 state나 props에 변화가 없어도 컨테이너가 계속 전달됐음. 
🤔 정확히 잘 몰루? 궁금
```jsx
// Legacy root API
ReactDOM.render(<App/>, document.getElementById("root"))

// New root API (리액트18이상)
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>)
```

### 렌더링
렌더링은 React가 컴포넌트를 호출하는 것
1. 처음엔 루트 컴포넌트를 호출함.
2. 이후엔 상태 업데이트가 렌더링을 트리거한 함수 컴포넌트를 호출<br>이 단계는 중첩된 컴포넌트가 더이상 없어질때까지 재귀적으로 수행됨.


### 커밋 dom
렌더링 호출 후 DOM을 수정함.  
1. 처음엔 appendchild() DOM API를 사용해 모든 DOM 노드를 화면에 그림.
2. 리렌더링은 최소한의 연산을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 함. 렌더링 간의 차이가 있는 경우에만 DOM 노드를 변경함.

### 페인팅
react가 DOM을 업데이트하면 브라우저는 화면을 다시 그림. 원래는 '브라우저 렌더링' 이지만 이 강의에서는 혼동을 피하기 위해 '페인팅'이라고 부를것.

