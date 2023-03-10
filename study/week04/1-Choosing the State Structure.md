# Choosing the State Structure

## 상ㅐ 구화 원칙
1. 그룹 관련 상태 - 두개 이상의 상태 변수를 동시에 업데이트 할 경우 하나로 병합하셈
2. 상태의 모순을 피할 것 - '불일치'할 수 있는 방식으로 구성하지 말 것
3. 중복 상태를 피할것 - 컴포넌트 내의 props나 기존 상태에서 계산할 수 있는 정보를 상태로 넣지 말 것
4. 상태 중복을 피할 것 - 동일한 데이터가 여러 상태 변수 또는 중첩된 객체 내에 중복되면 동기화 상태를 유지하기 어려움.
5. 깊게 중첩된 상태는 피할 것

DB의 '정규화'와 같다고 생각하면 됨.

## 그룹 관련 상태
x, y가 항상 같이 바뀌는 경우 아래처럼 하나의 객체로 묶는게 좋음.
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```
단, 하나만 바뀔 수 없으므로 한개만 수정할땐 스프레드 문법등을 사용해야함. => 분리가 낫지 않나

## 상태의 모순 피하기
단계를 표현할때 한개의 상태 변수에 단계를 담는 것을 예시로 듬.  

status ='typing', 'sending', 'sent' 등

가독성을 위해 아래처럼 작성할 수 있음
```jsx
const isSending = status === 'sending';
const isSent = status === 'sent';
```

## 중복 상태 방지
계산되는 경우 - fullName 같은 경우 firstName과 lastName에 따라 항상 계산할 수 있으므로 제거할 것. 아래와 같이 넣어줄 수 있음. (상태는 렌더링이 끝날때까지 변경되지 않으므로 상수여도 상관없나봄)
```jsx
const fullName = firstName + ' ' + lastName;
```

부모에게 전달 받은 경우 - 부모의 상태를 무조건 따른다면 아래처럼 걍 상수에 넣어 '미러링'이 되지 않도록 할 것.
```jsx
function Message({ messageColor }) {
  const color = messageColor;
```
부모의 상태를 무시하는 경우 전달받는 인자의 이름에 initial을 붙여서 명시적으로 알아볼 수 있게 하기
```jsx
function Message({ initialColor }) {
  const [color, setColor] = useState(initialColor);
```

## 상태에서 중복 방지
목록이 있고 선택된 것을 예제로 들음.  
목록의 내용이 편집되는 경우 양쪽 다 상태이면 선택된 상태의 내용도 업데이트 해줘야하므로 id 정도만 저장하는게 좋음.  

## 깊은 중첩 피하기
데이터를 플랫(정규화)하게 만들기.  
요런 느낌
```jsx
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 43, 47],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 27, 35]
  },
}
```
자식 데이터가 있는 경우 이럴 경우 컴포넌트의 유용성이 나타남. 깊이에 상관없이 처리 가능하게 구현하기 쉬움.  

메모리 사용 개선
메모리 사용을 개선하기 위해서는 중첩 객체에서 삭제된 객체를 제거해야함.
```jsx
function handleComplete(parentId, childId) {
  updatePlan(draft => {
    // Remove from the parent place's child IDs.
    const parent = draft[parentId];
    parent.childIds = parent.childIds
      .filter(id => id !== childId);

    // Forget this place and all its subtree.
    deleteAllChildren(childId);
    function deleteAllChildren(id) {
      const place = draft[id];
      place.childIds.forEach(deleteAllChildren); //자식부터 🤔 같이 날라갈텐디 왜? -> 명시적으로 삭제해서 gc가 빠르게 수집하고 메모리 해제하기 위해서
      delete draft[id]; //명시적으로 삭제
    }
  });
}
```

### 과제1
색상 업데이트 문제 해결  
-> 상태 없이 상수에 받아온 props를 전달
```jsx
import { useState } from 'react';

export default function Clock(props) {
  const color = props.color;
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
  );
}
```

### 과제 2
삭제 시 카운트 문제 해결  
-> total과 packed를 계산하도록 수정
```jsx
const [items, setItems] = useState(initialItems);
const total = items.length;
const packed = items.filter(item => item.packed === true).length;
```

### 과제 3
hover 시 스타일 사라지는 문제 해결
-> Letter.js자체에서 호버링 구현. App.js에서 상속받아야될 이유를 모르겠음.
```jsx
import { useState } from 'react';

const Letter = function ({
  letter,
  onToggleStar,
}) => {
  const [ isHighlighted, setHighlighted ] = useState(false);
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onMouseEnter={() => {
        setHighlighted(true);
      }}
      onMouseOut={() => {
        setHighlighted(false);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}
export default Letter;
```
### 과제4
다중 선택되게   
-> selectedIds를 배열로 변경
```jsx
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

const MailClient = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedCount = selectedIds.length;

  const handleToggle = (toggledId) => {
    // Was it previously selected?
    if (selectedIds.includes(toggledId)) {
      // Then remove this ID from the array.
      setSelectedIds(selectedIds.filter(id =>
        id !== toggledId
      ));
    } else {
      // Otherwise, add this ID to the array.
      setSelectedIds([
        ...selectedIds,
        toggledId
      ]);
    }
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
export default MailClient;
```