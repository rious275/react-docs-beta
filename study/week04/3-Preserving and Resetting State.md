# Preserving and Resetting State

## UI 트리
React는 JSX에서 UI 트리를 만듬. 그런 다음 React DOM은 해당 UI 트리와 일치하도록 브라우저 DOM 요소를 업데이트함.

## 상태는 트리의 위치에 연결됨.
상태는 실제로 React 내부에 있음. 그리고 DOM의 위치에 따라 각 상태 조각을 올바른 구성 요소와 연결함.  

## 동일한 위치의 동일한 컴포넌트는 상태를 유지함
```jsx
{isFancy ? (
  <Counter isFancy={true} /> 
) : (
  <Counter isFancy={false} /> 
)}
```
위와 같은 경우 상태가 유지됨. 즉, 같은 위치면 상태가 유지된다고 함.  
`UI 트리의 위치가 중요함.`

## 같은 위치에 다른 컴포넌트 재설정
```jsx
{isPaused ? (
  <p>See you later!</p> 
) : (
  <Counter /> 
)}
```
위 같은 경우는 상태가 유지되지 않고 파괴됨.
```jsx
{isFancy ? (
  <div>
    <Counter isFancy={true} /> 
  </div>
) : (
  <section>
    <Counter isFancy={false} />
  </section>
)}
```
위 같은 경우도 파괴됨. div와 section을 다시 그리기 때문

## 동일한 위치에서 상태 재설정
```jsx
{isPlayerA &&
  <Counter person="Taylor" />
}
{!isPlayerA &&
  <Counter person="Sarah" />
}
```
&&로 변수와 묶여서 지워지고 다시 그리는 듯?  

```jsx
{isPlayerA ? (
  <Counter key="Taylor" person="Taylor" />
) : (
  <Counter key="Sarah" person="Sarah" />
)}
```
위와 같이 key를 지정하면 React에서는 key를 위치의 일부로 사용함.  
그래서 따로 동작함.

### 과제1
텍스트 초기화 안되게
```jsx
import { useState } from 'react';

const App = () => {
  const [showHint, setShowHint] = useState(false);
  const hintText = showHint? 'Hide' : 'Show';
    return (
      <div>
        {showHint &&
          <p><i>Hint: Your favorite city?</i></p>
        }
        <Form />
        <button onClick={() => {
          setShowHint(!showHint);
        }}>{hintText} hint</button>
      </div>
    );
}
export default App;

const Form = () => {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

### 과제 2
이름 입력칸 값도 같이 움직이게  
-> 키 추가하여 해결
```jsx
import { useState } from 'react';

const App = () => {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field key="Last name" label="Last name" /> 
        <Field key="First name" label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key="First name" label="First name" />
        <Field key="Last name" label="Last name" /> 
        {checkbox}
      </>
    );    
  }
}
export default App;

const Field = ({ label }) => {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
```

### 과제 3
이름 클릭할때 입력칸도 따로 돌게  
-> key 달아줌
```jsx
<EditContact
  key={selectedId}
  initialData={selectedContact}
  onSave={handleSave}
/>
```

### 과제 4
이미지 지워졌다 나타나게 하기  
-> key 달아줌
```jsx
<img key={image.src} src={image.src} />
```

### 과제 5
확장 상태가 객체와 연결되게  
-> key를 바꿔줌
```jsx
<li key={contact.id}>
  <Contact contact={contact} />
</li>
```