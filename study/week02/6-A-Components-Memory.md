### 컴포넌트의 메모리

React에서는 컴포넌트별 변화하는 데이터들을 state라고 부른다.

```jsx
import { useState } from 'react';

const data = [
  {
    image: 'a',
  },
  {
    image: 'b',
  },
  {
    image: 'c',
  }
]

const Gallery = () => {
  const [index, setIndex] = useState(0);

  const handleClick() {
    setIndex(index + 1);
  }

  const currentImage = data[index];

  return (
    <>
      <button onClick={handleClick}>
        다음 이미지
      </button>
      <h2>{currentImage.name}</h2>
    </>
  );
}
```

React에서 `use`로 시작하는 함수를 Hook이라고 부른다.
(useState, useEffect, useMemo, useCallback 등등...)

Hook은 기본적으로 컴포넌트의 최상위에서만 호출할 수 있다.
(조건문, 반복문 등 안에서 호출할 수 없음)

상태값은 각 컴포넌트마다 독립적이다.

```jsx
const Gallery = () => {
  const [index, setIndex] = useState(0);

  const handleClick() {
    setIndex(index + 1);
  }

  const currentImage = data[index];

  return (
    <>
      <button onClick={handleClick}>
        다음 이미지
      </button>
      <h2>{currentImage.name}</h2>
    </>
  );
}


const Page = () => {
  return (
    <div className="Page">
      <Gallery /> // 1번 갤러리
      <Gallery /> // 2번 갤러리
    </div>
  );
}
```

위에서 두 갤러리는 다른 컴포넌트로 취급된다. 한쪽의 state가 변경되어도 다른쪽의 state는 영향이 없다.

end.
