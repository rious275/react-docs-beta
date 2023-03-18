# Referencing Values with Refs
컴포넌트가 정보를 저장하지만 해당 정보가 새 렌더링을 트리거 하지 않으려면 ref를 사용할 수 있음.

## 컴포넌트에 ref 추가
```jsx
import { useRef } from 'react';
const ref = useRef(0);
```
useRef는 다음과 같은 객체를 반환
```jsx
{ 
  current: 0 // ref.current로 접근
}
```
current는 js 객체 이므로 아무거나 넣을 수 있음.  

## 스탑워치 만들어보기
clearInterval에서 호출되는 ID는 렌더링에 사용되지 않으므로 ref에 보관
```jsx
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```
## useState와 useRef의 차이점
되도록 useState를 사용하는게 좋음.
|useRef|useState|
|---|---|
|useRef(initialValue)를 보고 { current: initialValue } 반환|useState(initialValue)상태 변수와 상태 setter 함수의 현재 값을 반환합니다. ( [value, setValue])|
|변경할 때 다시 렌더링을 트리거하지 않습니다.|변경하면 트리거가 다시 렌더링됩니다.|
|current변경 가능 - 렌더링 프로세스 외부에서 의 값을 수정하고 업데이트할 수 있습니다 .|"불변" - 상태 설정 기능을 사용하여 상태 변수를 수정하여 다시 렌더링 대기열에 넣어야 합니다.|
|current렌더링 중에 값을 읽거나 쓰지 않아야 합니다 .|언제든지 상태를 읽을 수 있습니다. 그러나 각 렌더링에는 변경되지 않는 자체 상태 스냅샷이 있습니다.|

렌더링이 다시 되냐 안되냐가 핵심인덧

## useReg 내부 동작
별도 setter없이 useState의 상태값에 직접 저장하고 불러오는 것과 같음.
```jsx
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

## Ref를 사용하는 경우
1. setTimeout, setInterval ID 저장
2. DOM 요소 저장 및 조작
3. JSX를 계산하는데 필요하지 않은 객체 저장

## Ref와 DOM
ref를 일반적으로 사용하는 사례는 DOM요소에 액세스하는 것임.

### 과제 1
clearTimeout 해결
```jsx
import { useRef } from 'react';

let timeoutID = useRef(null);

timeoutID.current = setTimeout(...

clearTimeout(timeoutID.current);
```

### 과제 2
버튼 Text가 On, off 전환이 안됨. 상태로 변경하여 해결
```jsx
import { useState } from 'react';

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => {
      setIsOn(!isOn);
    }}>
      {isOn ? 'On' : 'Off'}
    </button>
  );
}
export default Toggle;
```

### 과제 3
디바운싱, 각각의 버튼이 독립적이여야하는데 묶여서 동작함.  
timeoutId를 분리하여 해결
```jsx
function DebouncedButton({ onClick, children }) {
  const timeoutRef = useRef(null);
  return (
    <button onClick={() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}
```

### 과제 4
전송 후에도 마지막 입력값 적용되게..(왜 이런짓을 하는거야)  
Ref를 사용하여 현재값 출력
```jsx
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const textRef = useRef(text);

  function handleChange(e) {
    setText(e.target.value);
    textRef.current = e.target.value;
  }

  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + textRef.current);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={handleChange}
      />
      <button
        onClick={handleSend}>
        Send
      </button>
    </>
  );
}
```