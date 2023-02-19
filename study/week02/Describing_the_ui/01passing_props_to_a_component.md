## 컴포넌트에 props전달
반응 컴포넌트는 소품을 사용하여 서로 의사소통을 합니다.모든 부모 컴포넌트는 소품을 제공함으로써 자녀 컴포넌트에 일부 정보를 전달할 수 있습니다.소품이라고 하면 HTML 속성이 생각날 수 있지만 오브젝트, 배열, 함수를 포함한 JavaScript 값을 소품으로 전달할 수 있습니다.


### 1단계: 자식 구성 요소에 소품 전달

먼저 일부 소품을 에 전달합니다 Avatar. person예를 들어, (객체)와 size(숫자)라는 두 가지 소품을 전달해 보겠습니다 .

```jsx
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```


### 2단계: 자식 구성 요소 내부의 소품 읽기
내부 와 바로 뒤에 person, size쉼표로 구분된 이름을 나열하여 이러한 소품을 읽을 수 있습니다 . 이렇게 하면 변수와 마찬가지로 코드 내에서 사용할 수 있습니다 .({})function AvatarAvatar

```jsx
function Avatar({ person, size }) {
  // person and size are available here
}
```

추가) 각각 받기 vs 묶어서 받은 후 내부에서 Destructuring 
```jsx
function Avatar(props) {
  // note: 1
  const {person, size} = props;

  // note: 2
  props.person, props.size;

  <div>{person}</div>
  <div>{props.person}</div>
}
```

### 소품의 기본값 지정
값이 지정되지 않았을 때 대체할 기본값을 소품에 제공하려면 매개 =변수 바로 뒤에 기본값과 기본값을 넣어 분해하여 이를 수행할 수 있습니다.
```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```


### JSX 스프레드 구문으로 prop 전달
때때로 전달되는 props는 매우 반복적입니다.
```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
반복되는 코드에는 아무런 문제가 없습니다. 더 쉽게 읽을 수 있습니다. 그러나 때때로 당신은 간결함을 중시할 수 있습니다. Profile일부 구성 요소 는 모든 소품을 자식에게 전달합니다 Avatar. . props를 직접 사용하지 않기 때문에 보다 간결한 "확산" 구문을 사용하는 것이 좋습니다.

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

이렇게 하면 각 이름을 나열하지 않고 의 모든 Profile소품을 로 전달합니다.Avatar

제한적으로 확산 구문을 사용하십시오. 다른 모든 구성 요소에서 사용하고 있다면 문제가 있는 것입니다. 종종 구성 요소를 분할하고 자식을 JSX로 전달해야 함을 나타냅니다. 다음에 더 자세히 알아보세요!

추가) html 기본 attribute일때 자주 사용. 개인적으로 props를 두번 넣는 예제가 잘못된 느낌..

### JSX를 자식으로 전달
자식으로 전달하고 싶을때는
JSX 태그 안에 콘텐츠를 중첩하면 상위 구성 요소는 이라는 prop에서 해당 콘텐츠를 수신합니다 children. 예를 들어 아래 구성 요소는 로 설정된 소품을 Card수신 하고 래퍼 div에서 렌더링합니다.children<Avatar />
```jsx
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

```

### 소품이 시간에 따라 어떻게 변하는가
```
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}

```

 props는 불변(immutable) 합니다 . 컴퓨터 과학 용어는 "변경할 수 없음"을 의미합니다. 
 구성 요소가 props를 변경해야 할 때(예: 사용자 상호 작용 또는 새 데이터에 대한 응답으로) 부모 구성 요소에 다른 props (새 개체 )를 전달하도록 "요청"해야 합니다 ! 그런 다음 이전 props는 폐기되고 결국 JavaScript 엔진은 props가 가져간 메모리를 회수합니다.

 => 부모로부터 변경된 값을 받아야 한다. 

"소품 변경"을 시도하지 마십시오. 사용자 입력에 응답해야 하는 경우(예: 선택한 색상 변경) "상태 설정"이 필요하며 이는 State: A Component's Memory 에서 배울 수 있습니다 .

=> 사용자에 의해 변경되는 경우 state로 처리한다? 
