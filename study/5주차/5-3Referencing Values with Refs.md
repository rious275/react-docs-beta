# Referencing Values with Refs

컴포넌트가 특정 정보를 '기억'하도록 하고 싶지만
해당 정보가 새 렌더링을 트리거하지 않도록 하려는 경우  ref 를 사용할 수 있습니다

랜더링하지않고 특정정보 기억하기.

#### 학습내용

1. 컴포넌트에  ref 를 추가하는 방법
2.  ref  값을 업데이트하는 방법
3. state와 ref의 차이점
4.  ref 를 안전하게 사용하는 방법

컴포넌트 내에서 useRef Hook을 호출하고 참조하려는 초기 값을 유일한 인수로 전달한다.
ex) 값 0에 대한 참조
```
const ref = useRef(0);
```


useRef는 다음과 같은 객체를 반환
```
{ 
  current: 0 // useRef에 전달한 값
}
```
