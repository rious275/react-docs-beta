# Extracting State Logic into a Reducer

Reducer로 많은 상태를 한곳에 잘 정리하자.

## 1단계 : 이벤트 핸들러에서 상태 빼기
dispatch를 통해 작업 전달  
구조는 상관없으나 type은 일반적으로 들어간다.
```jsx
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}
```

## 2단계 - reducer 함수 작성
요런 너낌
```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
  }
}
```

## 3단계 - 컴포넌트의 reducer 사용

```jsx
import {useReducer} from 'react';
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
function tasksReducer(tasks, action) {
  //...
}
```

## Immer로 더 간단하게 사용
```jsx
import {useImmerReducer} from 'use-immer';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
  }
}
```

### 과제 1
기존 작성된 Reducer에 맞춰 ContactList의 onClick과 Chat.js의 onChange 구현
```jsx
//ContactList.js
<button
  onClick={() => {
    dispatch({
      type: 'changed_selection',
      contactId: contact.id,
    });
  }}>
  {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
</button>

//Chat.js
<textarea
  value={message}
  placeholder={'Chat to ' + contact.name}
  onChange={(e) => {
    dispatch({
      type: 'edited_message',
      message: e.target.value,
    });
  }}
/>
```

### 과제 2
Send 기능 구현
```jsx
//messengerReducer.js
// send_message 추가
case 'send_message': {
  return {
    ...state,
    message: '',
  };
}

//Chat.js
//버튼에 이벤트 핸들러 추가
<button 
  onClick={()=>{
    alert(`${contact.name} / ${message}`);
    dispatch({
      type: 'send_message',
    });
  }}
>Send to {contact.email}</button>
```


### 과제 3
사람 별로 chat 내용 유지
```jsx
//App.js
const message = state.messages[state.selectedId] ? state.messages[state.selectedId]:'';

//messengerReducer.js
export const initialState = {
  selectedId: 0,
  messages: [],
};

case 'edited_message': {
  return {
    ...state,
    messages: {
      ...state.messages,
      [state.selectedId]: action.message,
    },
  };
}
```

### 과제 4
userReducer 직접구현
```jsx
import {useState} from 'react';

export const useReducer = (reducer, initialState) => {
//reducer 에 messengerReducer 받아옴
  const [state, setState] = useState(initialState);

  const dispatch = (action) => {
    setState((s) => reducer(s, action));
  }

  return [state, dispatch];
}
```