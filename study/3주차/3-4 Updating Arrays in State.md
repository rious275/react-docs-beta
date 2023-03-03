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



