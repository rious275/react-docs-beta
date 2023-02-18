### 렌더링 목록

유사한 콘텐츠 데이터 목록을 노출 시키는 상황은 아주 많고, 일반적으로 아래와 같이 표현한다.

```
<ul>
  <li>호랑이</li>
  <li>토끼</li>
  <li>고라니</li>
  <li>펭귄</li>
  <li>피카츄</li>
</ul>
```

Javascript 배열 메서드를 사용해 좀 더 간편하게 표현할 수 있다.

```
const animals = [
  {
    id: 1,
    name: '호랑이',
  },
  {
    id: 2,
    name: '고라니',
  },
  {
    id: 3,
    name: '토끼',
  },
]

const AnimalList = () => {
  const list = animals.map((animal) =>
    <li key={animal.id}>{animal.name}</li>
  )
  return <ul>{list}</ul>
}

** 조건에 따라 원하는 동물만 노출할 수도 있다.
  const list = animals.filter((animal) =>
    animal.name === '고라니'
  )
```

map을 사용할 때, 요소의 고유성을 위해 key값을 반드시 넣어줘야 한다.

end.
