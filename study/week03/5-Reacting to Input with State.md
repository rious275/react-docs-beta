# Reacting to Input with State

## UI를 선언적으로 생각하기

### 1단계 구성요소의 다양한 시각적 상태 식별
`상태`별로 시각화 하라.  
= 상태가 바뀌면 UI에 즉각 적용되도록
```jsx
export default function Form({
  // Try 'submitting', 'error', 'success':
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
      </>
  );
}
```

### 2단계 : 상태변경을 트리거하는 요소를 결정
**사람** : 클릭, 입력, 링크 탐색 등  
**PC** : 네트워크 응답, 시간초과, 이미지 로드 등  

### 3단계 : useState를 사용하여 메모리의 상태를 나타냄.
꼭 필요한 상태 추가 후 가능한 모든 시각적 상태가 포함되도록 추가하여 시작 후 리팩토링
```jsx
//꼭 필요한 상태
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);

//가능한 모든 상태
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

### 4단계 : 중요하지 않은 상태 변수 제거
1. 상태가 충돌할때
2. 다른 상태변수로 이미 동일한 정보를 나타낼때
3. 다른 상태변수의 반대에서 동일 정보를 나타낼때

```jsx
//정리 후 남은 상태변수 ( 7개 -> 3개 )
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

리듀서는 조금 뒤에 나오니 일단 제외

### 5단계 : 이벤트 핸들러를 연결하여 상태 설정
최종 결과물
```jsx
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

### 과제 1
```jsx
import { useState } from 'react';

const Picture = () => {
  const [ isActive, setIsActive ] = useState(false);
  let bgClass = 'background';
  let pictureClass = 'picture';
  if(isActive){
    pictureClass += ' picture--active';
  } else {
    bgClass += ' background--active';    
  }
  
  return (
    <div className={bgClass}
      onClick={
          ()=> {
            setIsActive(false);
          }
        }
    >
      <img
        className={pictureClass}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={
          (e)=> {
            e.stopPropagation();
            setIsActive(true);
          }
        }
      />
    </div>
  );
}
export default Picture;
```

### 과제 2
```jsx
import { useState } from 'react';

export default function EditProfile() {
  const [ isEdit, setIsEdit ] = useState(false);
  const [ firstName, setFirstName ] = useState('Jane');
  const [ lastName, setLastName ] = useState('Jacobs');
  return (
    <form>
      <label>
        First name:
        {
          !isEdit ?
           (<b>{firstName}</b>)
          :
           (<input value={firstName} onChange={e => {
              setFirstName(e.target.value);
            }} />)
        }
        
        
      </label>
      <label>
        Last name:
        {
          !isEdit ?
            (<b>{lastName}</b>)
          :
            (<input value={lastName} onChange={e => {
          setLastName(e.target.value)}} />)
        }
        
      </label>
      <button type="button" onClick={()=>{
        setIsEdit(!isEdit);
      }}>
        Edit Profile
      </button>
      <p><i>Hello, {firstName} {lastName}!</i></p>
    </form>
  );
}
```

### 과제 3
```js
let firstName = 'Jane';
let lastName = 'Jacobs';
let isEditing = false;

const handleFormSubmit = (e) => {
  e.preventDefault();
  setIsEditing(!isEditing);
}

const handleFirstNameChange = (e) => {
  setFirstName(e.target.value);
}

const handleLastNameChange = (e) => {
  setLastName(e.target.value);
}

const setFirstName = (value) => {
  firstName = value;
  updateDOM();
}

const setLastName = (value) => {
  lastName = value;
  updateDOM();
}

const setIsEditing = (value) => {
  isEditing = value;
  updateDOM();
}

const updateDOM = () => {
  if (isEditing) {
    editButton.textContent = 'Save Profile';
    // TODO: show inputs, hide content
    show(firstNameInput);
    show(lastNameInput);
    hide(firstNameText);
    hide(lastNameText);
  } else {
    editButton.textContent = 'Edit Profile';
    // TODO: hide inputs, show content
    hide(firstNameInput);
    hide(lastNameInput);
    show(firstNameText);
    show(lastNameText);
  }
  // TODO: update text labels
  firstNameText.textContent = firstNameInput.value;
  lastNameText.textContent = lastNameInput.value;
  helloText.textContent = `Hello, ${firstNameInput.value} ${lastNameInput.value}!`;
}

const hide = (el) => {
  el.style.display = 'none';
}

const show = (el) => {
  el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
```