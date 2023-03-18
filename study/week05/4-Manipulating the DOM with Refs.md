# Manipulating the DOM with Refs

## 노드에 ref 연결
```jsx
import { useRef } from 'react';

const myRef = useRef(null);

<input ref={myRef}>

inputRef.current.focus();
```

## scrollIntoView
사파리 호환성이 또 발목 잡네

## 루프 내 사용
ref 콜백 - 속성에 함수를 전달  
한줄요약 - ref에 map, object등으로 dom node 관리

## 다른 컴포넌트의 dom 노드에 접근
아래처럼 ref를 전달 받아야함
```jsx
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```
아래처럼 기능제한할 수 있음
```jsx
import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});
```

## React가 refs를 붙일때
첫번째 렌더링 중에는 dom 노드가 생성전이므로 ref는 null.  
업데이트를 렌더링하는 중에는 아직 업데이트 되지 않음.  
일반적으로 이벤트 핸들러에서 ref에 액세스

## flushSync (react 18 이상)
정말 간단하게 말하면 async await으로 보면됨.  
비동기적인 코드를 강제로 동기적으로 만들고 react에서 리렌더링을 강제하도록 함.
```jsx
import { flushSync } from "react-dom";

const App = () => {
  const [todos, setTodos] = useState([]);
  const handleApp = () => {
    flushSync(() => {
      setTodos([...todos, { id: uuid(), task: input }]);
    });
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  //...
}
export default App;
```

## ref의 DOM 조작 모범사례
1. 포커스
2. 스크롤 위치
3. React가 노출하지 않는 브라우저 api 호출

### 과제 1
video tag에 ref를 추가하여 비디오 재생
```jsx
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const myVideo = useRef(null);
  
  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      myVideo.current.play();
    } else {
      myVideo.current.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <video ref={myVideo} width="250">
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}
```

### 과제 2
search 버튼을 누르면 input에 포커스
```jsx
import { useRef } from 'react';

export default function Page() {
  const myInput = useRef(null);
  const setFocus = () => {
    myInput.current.focus();
  }
  
  return (
    <>
      <nav>
        <button onClick={setFocus}>Search</button>
      </nav>
      <input
        ref={myInput}
        placeholder="Looking for something?"
      />
    </>
  );
}
```

### 과제3
선택된 것으로 스크롤
```jsx
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export default function CatFriends() {
  const selectedRef = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <>
      <nav>
        <button onClick={() => {
          flushSync(() => {
            if (index < catList.length - 1) {
              setIndex(index + 1);
            } else {
              setIndex(0);
            }
          });
          selectedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });            
        }}>
          Next
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li
              key={cat.id}
              ref={index === i ?
                selectedRef :
                null
              }
            >
              <img
                className={
                  index === i ?
                    'active'
                    : ''
                }
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i
  });
}
```

### 과제4
별도 컴포넌트 input에 포커싱
```jsx
//App.js
import { useRef } from 'react';
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <SearchButton onClick={() => {
          inputRef.current.focus();
        }} />
      </nav>
      <SearchInput ref={inputRef} />
    </>
  );
}

// SearchInput.js
import { forwardRef } from 'react';

export default forwardRef(
  function SearchInput(props, ref) {
    return (
      <input
        ref={ref}
        placeholder="Looking for something?"
      />
    );
  }
);
```