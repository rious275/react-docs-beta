# Your first component
## 실습
😡 예제대로 했더니 eslint가 img 태그를 picture로 감싸라고 날 괴롭힘.  

👉 picture로 감싸줘서 해결  

참고) next.js에서는 Image를 쓰라고 권고하는데 width, height가 필수값이라 때려침  

😱 궁금해서 tsx로 확장자를 바꿔봤다가 무수히 뜨는 에러를 보고 일단 나중으로 미루고 jsx로 진행

## 클래스형 컴포넌트? 함수형 컴포넌트?
궁금해서 찾아봄. 찾아보니 hooks의 도입으로 함수형 컴포넌트를 권고한다고 함. 더 가볍고 덜 복잡함.   

🤔 그렇다면 리액트에서 일반 함수(함수 선언문, 함수 표현식으로 선언된 함수)와 화살표 함수와의 차이점은??  

👉 검색 결과는 대체로 this에 대한 이야기밖에 없지만 ES6의 구분에 의하면 constructor, prototype, arguments가 있고 없고의 차이가 있다. 따라서 화살표 함수 사용이 더 가벼울 것으로 예상됨.  
그래서 예제를 화살표로 바꿔봄. 앞으로도 왠만하면 화살표 함수로 작성해볼 예정.    
[링크](http://localhost:3000/week01/first)

## 주의
컴포넌트를 중첩해서 작성하지 말자.  
(매우 느리고 버그가 발생할 수 있음.)  

🤔 그렇다면 메서드는 오케이인가?   

👉 찾아보니 hooks와 이벤트 핸들러를 작성할때 사용함.

### 과제 1
```jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

### 과제 2
```jsx
export default function Profile() {
  return (
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />
  );
}
```

### 과제 3
```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

### 과제 4
```jsx
function Hi(){
  return (
    <h1>안녕!</h1>
  );
}

export default function Home(){
  return (
    <Hi />
  );
}
```
