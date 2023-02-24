# State: A Component's Memory

리액트는 로컬 변수의 변경사항을 고려하지 않고 렌더링하고 변경이 있어도 리렌더링하지 않음.  

```jsx
import { useState } from 'react';
const [index, setIndex] = useState(0);
function handleClick() {
  setIndex(index + 1);
}
```
상태관리가 필요하면 useState를 이용하여 따로 선언해주고 별도의 setter 함수가 필요함.  

사족) 요기가 svelte와의 가장 큰 차이인듯. 스벨트에선 변경되지 않는 것은 상수로 선언하고 변수는 변경됨을 즉시 인식하고 리렌더링함. 위 코드를 svelte에서 구현하면 아래가 다임
```javascript
let index;
function handleClick() {
  index++;
}
```

## 첫번째 hook
`use`로 시작되는 다른 모든 함수를 `Hook`이라고 함.
`Hook`은 컴포넌트의 최상단 또는 자체 `Hook`에서만 호출할 수 있음. 

## useState의 해부학
```jsx
const [index, setIndex] = useState(0);
```
위에서 0은 index의 초기값임.  

state는 컴포넌트 내부에서만 동작함. 동일한 컴포넌트를 두번 렌더링하면 따로 동작함.

### 과제 1
```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const handleNextClick = () => {
    index < sculptureList.length && setIndex(index + 1);
  }
  const handlePrevClick = () => {
    index > 0 && setIndex(index - 1);
  }

  const handleMoreClick = () => {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handlePrevClick} disabled={index < 1}>
        Prev
      </button>
      <button onClick={handleNextClick} disabled={index >= sculptureList.length -1}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
export default Gallery;
```

### 과제 2
```jsx
import { useState } from 'react';

const Form = () => {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');

  const handleFirstNameChange = (e)=> {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e)=> {
    setLastName(e.target.value);
  }

  const handleReset = () => {
    setFirstName('');
    setLastName('');
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
export default Form;
```

### 과제 3 
```jsx
import { useState } from 'react';

const FeedbackForm = () => {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
export default FeedbackForm;
```

### 과제 4
handleClick 함수 내에서 입력을 받기때문에 별도 상태관리가 필요없음.
```jsx
const FeedbackForm = () => {

  const handleClick = () => {
    const name = prompt('What is your name?');
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
export default FeedbackForm;
```