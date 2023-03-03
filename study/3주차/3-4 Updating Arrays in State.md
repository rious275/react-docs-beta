# Updating Arrays in State

state의 배열을 업데이트 하려면 기존 배열을 수정하고 새로운 배열에 저장한 뒤 state에 값을 주어야 함.

학습 내용
React state에서 배열의 항목을 추가, 제거 또는 변경하는 방법
배열 내부의 객체를 업데이트하는 방법
Immer를 사용해 배열 복사를 덜 반복적으로 만드는 방법

## 변이 없이 배열 업데이트하기 
배열은 읽기전용으로 취급 
재할당해서는 안된다.


                 adding	push, unshift                 	                                concat, [...arr] spread syntax (example)
 권장하지않음     removing	pop, shift, splice	                               권장      filter, slice (example)
                 replacing	splice, arr[i] = ... assignment                           	map (example)
                 sorting	reverse, sort	                                                copy the array first (example)
                 
                 
 splice =배열을 변경함.
 slice =변경값으로 새로운 배열에 담음.
 
 push = 배열이 변경됨 (x) 
 
 
 ```
 setArtists( // 상태 바꾸기
  [ // 새 배열로 바꾸기
    ...artists, //모든 이전 항목을 포함하는 새 배열로 바꾸기
    { id: nextId++, name: name } // 그리고 마지막에 새 항목 하나
  ]
);
```

```
setArtists([
  { id: nextId++, name: name },
  ...artists // 이런식으로 항목을 뒤에 추가함
]);
```
```
 {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id  //배열을 삭제하지 않고 클릭한 값의 id가 아닌id를 가진 값들의 배열을 재생성한다. 
                )
              );
            }}>

```
여기서 artists.filter(a => a.id !== artist.id)는 "artist.id와 다른 ID를 가진 아티스트로 구성된 배열을 생성한다"는 의미입니다. 즉, 각 아티스트의 "삭제" 버튼을 누르면 배열에서 해당 아티스트를 필터링한 다음 결과 배열로 다시 렌더링하도록 요청합니다. 필터는 원래 배열을 수정하지 않는다는 점에 유의하세요.

## 배열 변환하기 
배열의 모든항목을 변경하려는 경우 map()을 통해 할 수 있다.

```
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => { // 맵으로 한번씩 돌린다.
      if (shape.type === 'square') { //shape의 type을 통해 써클만 아래로 내린다.
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }
  ```
  ### map의 index로 n번째 값을 변경하기
  ```
  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {//두번째 인자가  index
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }
  ```

```
 function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
     
      ...artists.slice(0, insertAt), 
      // 0을 포함하고  1전의 값 
      { id: nextId++, name: name },
      // 그후 1부터의 값
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }
  
```
배열의 순서를 변경하는법
reverse() 및 sort() 메서드는 원래 배열을 변경하므로 직접 사용할 수 없다.
배열을 복사해서 그 복사한 배열을 reverse() ,sort()하고 set으로 전달하면 된다.
