# Responding to Events
nextjs에서는 'use client' 선언 후 작성해야 동작함.  
기본적으로 컴포넌트가 서버에서 렌더링되기 때문.  

## 이벤트 핸들러 추가
1. 별도 함수 가져오기
```jsx
const handleClick = () => {
  alert('😘🥰');
}
return (
  <button onClick={handleClick}>
)
```
2. 인라인
```jsx
<button onClick={()=> {
  alert('🤪😜');
}}>
```
이벤트 핸들러에 전달되는 함수는 호출이 아니고 전달되어야함. (호출되면 렌더링 시점에 실행됨)
```jsx
<button onClick={handleClick()}> //요래 쓰면 안됨
<button onClick={alert('😳');}> //요래 써도 안됨.
```

## 이벤트 핸들러에서 Props 읽기
```jsx
const AlertButton = ({ message, children }) => {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

const Toolbar = () => {
  return (
    <div>
      <AlertButton message="😱😱😱!">
        Play Movie
      </AlertButton>
      <AlertButton message="👻👻👻 Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
export default Toolbar;
```

## 이벤트 핸들러를 프로퍼티로 전달
```jsx
const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

const PlayButton = ({ movieName }) => {
  const handlePlayClick = () => {
    alert(`Playing ${movieName}!`);
  };

  return (
    <Button onClick={handlePlayClick}>
      Play {movieName}
    </Button>
  );
}

const UploadButton = () => {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

const Toolbar = () => {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
export default Toolbar;
```
디자인 시스템을 이용하는 버튼과 같은 경우 컴포넌트에 스타일은 포함하지만 동작은 이벤트 핸들러를 전달하여 처리함.

## 이벤트 핸들러 프로퍼티 이름 지정
```jsx
const Button = ({ onSmash, children }) => {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}
<Button onSmash={() => alert('Playing!')}>
```

## 이벤트 전파
캡쳐링 -> 타깃 -> 버블링  
자식 컴포넌트에서 부모로 올라감. (onScroll만 연결된 JSX태그에서만 동작)
```jsx
<button onClick={e => {
  e.stopPropagation(); //버블링 단계 시 전파중지
  onClick();
}}>

// onClickCapture 캡쳐링 단계에서 동작
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
</div>

<form onSubmit={e => {
  e.preventDefault(); // 태그의 브라우저 기본 동작 방지
  alert('Submitting!');
}}>
```

### 과제 1 
```jsx
const LightSwitch = () => {
  const handleClick = () => {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick}>
      Toggle the lights
    </button>
  );
}
export default LightSwitch;
```

### 과제 2
```jsx
const ColorSwitch = ({onChangeColor}) => {
  return (
    <button onClick={onChangeColor}>
      Change color
    </button>
  );
}
export default ColorSwitch;
```