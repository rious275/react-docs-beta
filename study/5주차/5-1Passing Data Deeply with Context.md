# Passing Data Deeply with Context


학습 내용
'프롭 드릴링'이란 무엇인가요?
반복적인 props 전달을 컨텍스트로 대체하는 방법
컨텍스트의 일반적인 사용 예시
컨텍스트에 대한 일반적인 대안

props로 너무많은 컴포넌트를 지나치는것이 비효율적이다.

context는 그 아래 모든 컴포넌트가 데이터값을 받을 수 있게 해준다.

## context생성방법


1. 컨텍스트를 생성합니다. (제목 레벨에 대한 컨텍스트이므로 LevelContext라고 부를 수 있습니다.)
2. 데이터가 필요한 컴포넌트에서 해당 컨텍스트를 사용합니다. (헤딩은 LevelContext를 사용합니다.)
3. 데이터를 지정하는 컴포넌트에서 해당 컨텍스트를 제공합니다. (섹션은 LevelContext를 제공합니다.)
4. 컨텍스트를 사용하면 부모(멀리 떨어져 있는 부모라도!)가 그 안에 있는 전체 트리에 일부 데이터를 제공할 수 있습니다.

## step 1 context 생성
```
Step 1: Create the context 
First, you need to create the context. You’ll need to export it from a file so that your components can use it:
```
## step 2 context hook import

```
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';
```
```
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}

```
```
export default function Section({ level, children }) {
  반환 (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```
이는 React에게 "이 <Section> 안에 있는 컴포넌트가 LevelContext를 요청하면, 
이 level을 제공하라"고 지시합니다.
  
컴포넌트는 그 위에 있는 UI 트리에서 가장 가까운 <LevelContext.Provider> 값을 사용합니다.
  

 순서
1. level 프로퍼티를 <Section>에 전달합니다.
2. <Section>은 그 자식들을 <LevelContext.Provider 값={level}>으로 래핑합니다.
3. Heading은 useContext(LevelContext)를 사용하여 위의 LevelContext에서 가장 가까운 값을 묻습니다.
  
  
  아래와 같이 작성하면 level의 값을 계속가져올 필요가 없다.
  ```
  export default 함수 Section({ children }) {
  const level = useContext(LevelContext);
  반환 (
    <section className="section">
      <LevelContext.Provider value={level + 1}>> //level을 통해 얼마나 깊은 수준에 있는지 파악 가능하다.
        {children}
      </LevelContext.Provider>
    </section>
  );
}
  ```
  
  
  
