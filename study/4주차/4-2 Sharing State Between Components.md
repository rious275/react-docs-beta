# Sharing State Between Components

두 컴포넌트의 상태가 항상 함께 변경되기를 원할 때에는 가장 가까운 공통 부모로 이동시키고 props로 값을 내려받으면 된다.

배우게 될 내용
1. 리프팅 업을 통해 컴포넌트 간에 state를 공유하는 방법
2. 제어되는 컴포넌트와 제어되지 않는 컴포넌트
3. 예제로 상태 올리기 
4. 이 예제에서는 부모 아코디언 컴포넌트가 두 개의 개별 패널을 렌더링합니다:

아래의 경우 컴포넌트가 2개 생성되어 2개의 state를 갖는다.
```

import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
```
### 하위 컴포넌트에서의 상태제거
