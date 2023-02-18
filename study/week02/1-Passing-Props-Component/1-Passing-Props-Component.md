### 컴포넌트에 Props 전달하기

모든 부모 컴포넌트는 자식 컴포넌트에 props로 일부 정보를 전달할 수 있습니다. props로 객체, 배열, 함수를 포함한 모든 자바스크립트 값을 전달할 수 있습니다.

props는 JSX 태그에 전달하는 데이터이며, 아래 예제에서 `className`, `src`, `alt`, `width`, `height`는 img 태그에 전달할 수 있는 몇 가지 프로퍼티입니다.

```
const Avatar = () => {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}
```

\*\* 아래 예제는 props를 전달하는 컴포넌트와 전달하지 않는 컴포넌트의 간단한 예제입니다.

```
// props를 전달하지 않는 컴포넌트

const Profile = () => {
  return (
    <Avatar />
  )
}

// props를 전달하는 컴포넌트
** person이라는 객체와 size라는 숫자를 props로 전달

const Profile = () => {
  return (
    <Avatar
      person={{ name: 'Choi'}}
      size={100}
    />
  )
}
```

---

과제1. Extract a component

```
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b>
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b>
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b>
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b>
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

end.
