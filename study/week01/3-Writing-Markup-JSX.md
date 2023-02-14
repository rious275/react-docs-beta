# Writing Markup with JSX

## 단일부모 요소
<> </> 귀찮은디.. Fragment 알아서 처리해주면 안되요?🥺 뷰3랑 스벨트는 되는디

## 모든 태그를 닫아라
알았다

## 카멜케이스
속성까지도 카멜케이스로 작성할 것.  

😡 class가 예약어니까 이해는 감. 킹치만 className 불..편. js랑 html을 합쳐놓으니까 이런 혼종이😱 라는 느낌임.

🤔 aria-*, data-*은 왜 고대로

## 컨버터
html을 따로 작성하고 넣는 경우는 안 만들지 싶다.  
jsx에 익숙해지는 동안엔 도움될듯  
[링크](https://transform.tools/html-to-jsx)  

### 과제
```jsx
const Bio = () => {
  return (
    <>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>
      <p className="summary">
        You can find my thoughts here.
        <br /><br />
        <b>And <i>pictures</i></b> of scientists!
      </p>
    </>
  );
}
export default Bio;
```