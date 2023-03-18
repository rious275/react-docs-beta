# Passing Data Deeply with Context

심층적으로 전달이 필요할때 사용  

## 1단계 - 컨텍스트 만들기
```jsx
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

## 2단계 - 컨텍스트 사용
다른 hook과 마찬가지로 컴포넌트내의 최상위에서만 호출가능
```jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```

## 3단계 - 컨텍스트 제공
아래처럼 자식에게 전달함.
```jsx
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```
```jsx
<Section level={1}>
  <Heading>h1</Heading>
  <Section level={2}>
    <Heading>h2</Heading>
```

## 동일한 구성요소에서 컨텍스트 사용 및 제공
아래처럼 계산해주면 Section에 전달할 필요없음
```jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```
```jsx
<Section>
  <Heading>h1</Heading>
  <Section>
    <Heading>h2</Heading>
```

## 컨텍스트는 중간 컴포넌트를 통과할 수 있음
중첩에 관계없이 전달될 수 있음.
서로 다른 React 컨텍스트는 서로 재정의하지 않음.

## 주의점
일부 props를 다중 중첩된 경우 전달해야한다고 반드시 컨텍스트를 사용해야하는 경우는 아님.
1. props를 전달하여 시작.
2. 컴포넌트를 따로 빼고 jsx를 children으로 전달.

## 사용사례
1. 테마 설정
2. 사용자 인식
3. 라우팅
4. 상태 관리

### 과제 1
props로 전달되던 이미지 크기를 컨텍스트로 변경
```jsx
// App.js
import { useState, useContext } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';
import { ImageSizeContext } from './Context.js';

const App = () => {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <ImageSizeContext.Provider
      value={imageSize}
    >
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List />
    </ImageSizeContext.Provider>
  )
}
export default App;

const List = () => {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place place={place} />
    </li>
  );
  return <ul>{listItems}</ul>;
}

const Place = ({ place }) => {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

const PlaceImage = ({ place }) => {
  const imageSize = useContext(ImageSizeContext);
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}

// Contest.js
import { createContext } from 'react';

export const ImageSizeContext = createContext(500);
```