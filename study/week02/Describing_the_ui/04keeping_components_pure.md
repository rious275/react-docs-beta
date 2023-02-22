## 순수함수
React는 이 개념을 중심으로 설계되었습니다. React는 작성하는 모든 구성 요소가 순수 함수라고 가정합니다. 즉, 작성한 React 구성 요소는 동일한 입력이 주어지면 항상 동일한 JSX를 반환해야 합니다.


### 순수하지 않은 함수
```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```
외부에서 선언된 변수를 쓰고있어서 의도되지 않은것 결과를 나올수잇다. 
=> 애초에 예제가 잘못됨..

props로 변경
```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

로컬 컴포넌트여도 밖에서 선언한 배열은 문제를 일으킬수있다.
```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```
