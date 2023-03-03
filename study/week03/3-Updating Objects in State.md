# Updating Objects in State

## 상태를 읽기 전용으로 취급하자
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
position.x = 5;
```
위 코드처럼 작성 시 React가 상태가 변경된걸 모름.  
따라서 setter에 객체를 넣어줘서 구현해야함.  
```jsx
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```
위 처럼 스프레드 문법을 이용하면 좀 더 간단함.  

```jsx
function handleChange(e) {
  setPerson({
    ...person,
    [e.target.name]: e.target.value
  });
}
```
위처럼 키값도 전달 받아 하나의 이벤트 핸들러로 해결할수도있음.  

## 중첩 객체 업데이트
예1) 새 객체를 생성하여 중첩 객체에 넣어주는 방법
```jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

예2) 스프레드 문법 사용
```jsx
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

🤔 객체의 동작 방식에 대해 부정확한 방법. 코드가 실행될 때 `중첩`된 개체 같은 건 없고. 실제로는 두개의 서로 다른 객체를 보고 있다? nested?  

예제가 이상함.
```jsx
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```
와
```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```
는 같을 수 없다 생각됨. 토론 ㄱ ㄱ 

## Immer
중첩 객체는 아래와 같이 처리하자
```jsx
import { useImmer } from 'use-immer';
const [person, updatePerson] = useImmer({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

### 과제 1
```jsx
import { useState } from 'react';

const Scoreboard = () => {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  const handlePlusClick = () => {
    setPlayer({
      ...player,
      score: player.score +1
    });
  }

  const handleFirstNameChange = (e) => {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  const handleLastNameChange = (e) => {
    setPlayer({
      ...player,
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
export default Scoreboard;
```

### 과제 2
움직인 거리만큼 setShape를 이용해 설정해줘서 해결
```jsx
const handleMove = (dx, dy) => {
  setShape((prevShape) => {
    return {
      ...prevShape,
      position: {
        x: prevShape.position.x + dx,
        y: prevShape.position.y + dy,
      },
    };
  });
}
```

### 과제 3
```jsx
const [shape, updateShape] = useImmer({
  color: 'orange',
  position: initialPosition
});

const handleMove = (dx, dy) => {
  updateShape(draft => {
      draft.position.x += dx;
      draft.position.y += dy;
  });
}

const handleColorChange = (e) => {
  updateShape({
    ...shape,
    color: e.target.value
  });
}
```