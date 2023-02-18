### 이벤트 핸들러 추가하기

이벤트 함수를 정의 후 JSX 태그에 프로퍼티로 전달.

```
const Button = () => {
  const handleClick = () => {
    alert('🍉');
  }

  return (
    <button onClick={handleClick}>
      이벤트 발생 버튼
    </button>
  );
}

--- 혹은 아래처럼 인라인으로도 가능

  return (
    <button onClick={() => alert('🍉'))}>
      이벤트 발생 버튼
    </button>
  );
```

주의할 점은 함수를 실행하는 것이 아니라 그 자체를 "전달"하는 것

---

부모 컴포넌트의 함수를 자식 컴포넌트에서 실행하기

```
const Child = ({ handleClick }) => {
  return (
    <button onClick={(e) => {
      e.stopPropagation()
      handleClick()
    }}>
      부모에서 받은 onClick 실행
    </button>
  )
}

/** 메인 컴포넌트 */
const Parent = () => {
  return (
    <Child handleClick={() => alert('🍉')}>
      이벤트 발생 버튼
    </Child>
  );
}
```

---

이벤트 버블링

```
const Toolbar = () => {
  return (
    <div onClick={() => alert('🍉')}>
      <button onClick={() => alert('🍊')}>
        오렌지
      </button>
      <button onClick={() => alert('🥑')}>
        아보카도
      </button>
    </div>
  );
}
```

위의 오렌지 버튼을 클릭하면, 오렌지 이후 수박이 뜬다.

```
// 이제 오렌지는 전파되지 않습니다.
const Toolbar = () => {
  return (
    <div onClick={() => alert('🍉')}>
      <button onClick={() => {
        e.stopPropagation()
        alert('🍊')
      }}>
        오렌지
      </button>
      <button onClick={() => alert('🥑')}>
        아보카도
      </button>
    </div>
  );
}
```

`stopPropagation` 이벤트의 전파를 막는다.
`preventDefault` 가지고 있는 기본 동작을 막는다.

end.
