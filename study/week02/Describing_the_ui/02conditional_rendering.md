종종 다른 조건에 따라 다른 것을 표시해야 합니다. React에서는 if문, &&, ? :연산자와 같은 JavaScript 구문을 사용하여 JSX를 조건부로 렌더링할 수 있습니다.


### 조건부 JSX 반환

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item ****
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

```

### if

```jsx
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;

```

#### 조건부로 아무것도 반환하지 않음null
```jsx
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

### 조건부(삼항) 연산자( ? :)
```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

많으면 더러워보임
```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

### 논리 AND 연산자( &&)
```jsx
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

&& 의 왼쪽에 왼쪽에 숫자를 넣지 마십시오. 
=> ts에선 왼쪽이 boolean이 아닐 경우 lint 표시


### JSX를 변수에 조건부로 할당

조건을 만드는 변수 처리.
=> 이렇게는 사용해본적이 없음. 단순 렌더일경우 코드가 더 길어져서 다른 코드들도 같이 있다면 더 복잡해 보일거같은

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```
