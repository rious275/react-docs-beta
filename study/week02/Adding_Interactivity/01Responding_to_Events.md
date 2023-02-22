## 이벤트 핸들러 넣기

파라미터가 필요한 함수로 넣기

```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```

파라미터가 필요하지 않은 함수

```jsx
<button onClick={handleClick}>Click me</button>
```

props로 넘길수도있음

```jsx
function Button({ onSmash, children }) {
  return <button onClick={onSmash}>{children}</button>;
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert("Playing!")}>Play Movie</Button>
      <Button onSmash={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}
```

이벤트 버블링 중지

````jsx
<button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
    ```
````
