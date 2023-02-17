### 컴포넌트

- React의 핵심 개념 중 하나로, 마크업으로 뿌릴 수 있는 자바스크립트 함수이다.
- 버튼, 아이콘 등의 요소의 단위부터 페이지 단위까지 다양하게 존재한다.
- 마크업, CSS, Javascript를 재사용 가능하도록 컴포넌트화 할 수 있다.

```
const Title = () => {
  return <h1>여기는 타이틀</h1>
}

const Body = () => {
  return <p>여기는 바디</p>
}
```

- 컴포넌트화 되었다 하더라도 컴포넌트의 내부는 여전히 마크업과 CSS, Javascript로 이루어져 있다.
- HTML 태그와 마찬가지로 여러 컴포넌트를 조합해 페이지를 디자인할 수 있다.
- 작성한 컴포넌트들은 재사용 가능하며 이미 만들어진 컴포넌트들이 많을수록 개발 속도가 빨라진다.

```
const Page = () => {
  return (
    <>
      <Title />
      <Body />
    </>
  )
}
```

### 컴포넌트 내보내기

- 컴포넌트는 `export default` 문을 활용해서 내보낸 후, 다른 파일에서도 사용할 수 있다. (위 문법은 React 문법이 아니라 Javascript 문법이다.)
- React의 컴포넌트의 이름은 무조건 대문자로 시작해야 한다.
- 위에서 작성했던 Title과 Body는 HTML처럼 작성했지만, 실제로는 Javascript이다.
- 이 문법을 JSX라고 하며, Javascript 안에 마크업을 삽입할 수 있다.

\*\* 반환문이 한줄이 아닐 때는 아래와 같이 괄호로 묶어야 한다.

```
1. 반환문이 한 줄일 때,
return <h1>여기는 타이틀</h1>

2. 한 줄이 아닐 때,
return (
  <div>
    <h1>여기는 타이틀</h1>
  </div>
)
```

### 부모 컴포넌트와 자식 컴포넌트

```
const Page = () => {
  return (
    <>
      <Title />
      <Body />
    </>
  )
}
```

- 위 예제에서 `Page`는 부모 컴포넌트이고, 그 안에 사용되어진 `Title`과 `Body`는 자식 컴포넌트라 부를 수 있다.
- 컴포넌트 내부에서는 다른 컴포넌트를 선언하면 안된다.
  - 참고로, 공식 문서에 따르면 React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리한다.
  - 컴포넌트는 작성이 불가능하지만, 태그를 반환하는 함수 자체는 작성이 가능하다는 뜻.
- 정리하자면, React 안에서의 모든 UI는 컴포넌트이다.

내보내기와 가져오기

- 작성 후 `export`한 Title, Body 컴포넌트를 다른 곳에 사용하고 싶을 때는 사용할 컴포넌트에서 아래와 같이 가져온다.

```
import Title from './Title'
import Body from './Title'

const Component = () => {
  return (
    <>
      <Title />
      <Body />
    </>
  )
}
```

### JSX

- JSX는 JavaScript 구문의 확장이며 React 컴포넌트는 이 구문을 사용할 뿐이다.
- 웹의 발전함에 따라 더욱 인터랙티브해지면서 마크업보다 로직의 비중이 커졌고, HTML를 Javascript가 담당하는 부분이 많아졌다.
- 서로 관련 없는 부분은 컴포넌트화로 분리 후 개발하는 것이 좀 더 안전하다.

### JSX 규칙

1. 단일 상위 태그

- JSX에서 여러 요소를 반환할 땐 반드시 단일 상위 태그로 감싸는 작업이 필요하다.

```
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <ul>
    ...
  </ul>
</div>
```

- 만약에 div를 사용하지 않으려면 <></>로도 가능하다.
- <></>는 Fragment라 하며, HTML에 흔적을 남기지 않고 그룹화 할 수 있다.

```
<>
  <h1>Hedy Lamarr's Todos</h1>
  <ul>
    ...
  </ul>
</>
```

---

2. 명시적 태그 닫기

- 태그는 항상 클로징이 필요하다.

```
<img src='' alt='' />
```

---

3. camelCase 사용

카멜케이스 : text-decoration >> textDecoration

- JSX에서 어트리뷰트를 작성할 때, 변수 이름에 '-'를 포함할 수 없고 class와 같은 예약어를 사용할 수 없다.
- 이 떄문에 React에서는 class를 className으로 사용한다.
- JSX 변환기를 사용하면 HTML를 쉽게 변환할 수 있다.
  - https://transform.tools/html-to-jsx

---

- JSX 안에서 자바스크립트를 사용할 때는 아래와 같이 중괄호를 사용한다.
  - 문자열 "avatar"와 변수 `avatar` 구분 유의

```
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';

  return (
    <img
      className="avatar"
      src={avatar}
      alt=""
    />
  );
}
```

```
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

---

### React의 인라인 스타일 적용

```
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

return (
  <div style={person.theme}>
    <h1>{person.name}'s Todos</h1>
  </div>
  )
```

end
