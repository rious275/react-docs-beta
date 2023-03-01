# State as a Snapshot

## state setting은 렌더링을 트리거함.
1. 이벤트 핸들러에 따라 리렌더링이 일어나는게 아니고 상태를 setting 했을 때 리렌더링함.  
2. `렌더링`이란 React가 컴포넌트를 호출하는 것을 의미. 컴포넌트가 반환하는 JSX가 그 시간의 UI의 스냅샷과 같음
3. 함수실행 > 스냅샷 계산(이게 아마 VDOM인가?) > DOM tree 업데이트
4. 상태의 값의 변경은 렌더링이 끝나고 변경됨.
```JSX
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
// 렌더링이 끝나기 전까지 number의 값이 변경되지 않으므로 결과적으로 + 1이 실행되는 것과 같음.
```

**결론 : 기본적으로 상태는 렌더링이 끝날때까지 변경되지 않는다.**

### 과제 1
setWalk 전후에 넣어도 차이가 없음. 왜냐면 렌더링이 끝나기전에 상태가 안 변하기 때문
```jsx
import { useState } from 'react';

const TrafficLight = () => {
  const [walk, setWalk] = useState(true);

  const handleClick = () => {
    setWalk(!walk);
    const message = walk? 'Stop is next' : 'Walk is next';
    alert(message);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
export default TrafficLight;
```