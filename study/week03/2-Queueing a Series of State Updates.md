# Queueing a Series of State Updates

React는 상태 업데이트를 처리하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다린다. 그래서 모든 호출 후에 리렌더링이 발생함.  
```jsx
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```
위와 같은 형태면 React는 이벤트 핸들러의 다른 모든 코드가 실행된 후 처리되도록 이 함수들을 큐에 넣고 다음 렌더링시 최종 업데이트 된 상태를 제공함.  

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```
시작은 n => n + 1 형식을 지키지 않아도 됨.  

## 명명규칙
상태변수의 첫글자로 지정하는게 일반적
```jsx
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

### 과제 1
```jsx
import { useState } from 'react';

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const RequestTracker = () => {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  const handleClick = async () => {
    setPending(p => p + 1);
    await delay(3000);
    setPending(p => p - 1);
    setCompleted(c => c + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

export default RequestTracker;
```

### 과제 2
TestCase를 다 통과 시켜라.  
n => n + 1인 queue만 함수로 실행하고 나머지는 대입함.
```jsx
export const getFinalState = (baseState, queue) => {
  let finalState = baseState;

  for (const item of queue) {
    if (typeof item === 'function') {
      finalState = item(finalState);
    } else {
      finalState = item;
    }
  }

  return finalState;
}
```
