# Keeping Components Pure

컴포넌트는 같은 프로퍼티가 전달되면 늘 같은 결과를 반환해야함.  
❌ 헷갈림 주의 : 랜덤 함수 등을 이용하여 1~6까지 반환하는 컴포넌트가 있다고 할 때 랜덤값을 컴포넌트 내에서 생성하여 반환하면 순수 함수임.  

## 사이드 이펙트
외부 변수를 컴포넌트 내에서 계산하지 말 것. 각 컴포넌트가 순서대로 렌더링 될 것이라 예상해선 안되기 때문  
👉 외부에서 계산해서 프로퍼티로 던져주자

## 스트릭트 모드
각 컴포넌트의 함수를 두번 호출하여 컴포넌트가 순수한지 체크해준다.  

밑에 얘로 루트 컴포넌트를 감싸면 실행됨.
```jsx
<React.StrictMode>
```

넥스트에선 다음과 같이
```jsx
// next.config.js
module.exports = {
  reactStrictMode: true,
}
```

### Local Mutation
컴포넌트 내에서 방금 생성한 변수와 객체를 변경하는 것은 괜찮음.
```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

## 사이드 이펙트를 일으킬 수 있는 곳
사이드 이펙트=화면 업데이트, 애니메이션 시작, 데이터 변경 등  
리액트에서 사이드 이펙트는 보통 이벤트 핸들러 안에 속함.  
이벤트 핸들러가 컴포넌트 내부에 정의되어 있어도 렌더링 중에는 실행되지 않아서 순수할 필요가 없다.  
하다하다 안되면 useEffect 호출을 통해 반환된 jsx에 첨부할 수 있음. 요 방법은 왠만하면 마지막에..  
👉 왠만하면 렌더링만으로 로직을 표현하자.

## 리액트가 순수성을 유지하는 이유
1. 컴포넌트를 다른 환경에서 실행할 수 있음.
2. 입력이 변경되지 않은 컴포넌트의 렌더링을 건너뛰면 성능 향상.
3. 리액트의 모든 것은 순수성을 유지하는 것을 전제로 하고 있음.

### 과제 1
```jsx
const Clock = ({ time }) => {
  let hours = time.getHours();
  let timeClass = 'day';
  if (hours >= 0 && hours <= 6) {
    timeClass = 'night';
  } 
  return (
    <h1 id="time" className={timeClass}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
export default Clock;
```

### 과제 2
```jsx
import Panel from "./Panel.js";
import { getImageUrl } from "./utils.js";

const Profile = ({ person }) => {
  return (
    <Panel>
      <Header person={person} />
      <Avatar person={person} />
    </Panel>
  );
}

const Header = ({ person }) => {
  return <h1>{person.name}</h1>;
}

const Avatar = ({ person }) => {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}
export default Profile;
```

### 과제 3
```jsx
const StoryTray = ({ stories }) => {
  const storiesWithCreate = [...stories, {
    id: 'create',
    label: 'Create Story'
  }];

  return (
    <ul>
      {storiesWithCreate.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
export default StoryTray;
```