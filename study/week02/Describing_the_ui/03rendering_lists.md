렌더링 하는 함수 map, fileter 

```jsx
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```
이렇게 반복된 부분을 리팩토링

1. 배열화
```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

2.peopleJSX 노드의 새 배열에 멤버를 매핑 합니다listItems .
```jsx
const listItems = people.map(person => <li>{person}</li>);
```

3. listItems다음으로 래핑된 구성 요소에서 반환합니다<ul>
```jsx
return <ul>{listItems}</ul>;
```

```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map((person, key) =>
    <li key={key}>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```
=> key 값 필수

### 항목 배열 필터링

```jsx
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

profession이 chemist인것만 가져오기 
```jsx
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

map으로 렌더
```jsx
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

map render 2가지 방법
```jsx
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```

```jsx
const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});
```