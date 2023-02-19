# Conditional Rendering

컴포넌트는 조건에 따라 null 반환 가능.  

삼항연산자를 이용하여 아래 같이 표현 가능
```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

혹은 && 연산자를 이용하여 아래 같이 표현 가능. 왼쪽에 숫자를 넣을땐 식으로 넣도록 한다. ex) ```aa > 0```
```jsx
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

혹은 별도 변수를 사용해 아래와 같이 작성 가능
```jsx
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
```
변수 뿐 아니라 jsx에도 동작
```jsx
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
```

### 과제 1
```jsx
const Item = ({ name, isPacked }) => {
  return (
    <li className="item">
      {name} {isPacked ? '✔':'❌'}
    </li>
  );
}

const PackingList = () => {
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
export default PackingList;
```

### 과제 2
```jsx
const Item = ({ name, importance }) => {
  let itemImportance = importance > 0 && (<i>importance : {importance}</i>)
    
  return (
    <li className="item">
      {name} {itemImportance}
    </li>
  );
}

const PackingList = () => {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
export default PackingList;
```

### 과제3
```jsx
const Drink = ({ name }) => {
  let plant = 'bean';
  let caffeine = '80–185 mg/cup';
  let age = '1,000+ years';
  if(name === 'tea') {
    plant = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{plant}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

const DrinkList = () => {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
export default DrinkList;
```