### 컴포넌트에 Props 전달하기

모든 부모 컴포넌트는 자식 컴포넌트에 props로 일부 정보를 전달할 수 있습니다. props로 객체, 배열, 함수를 포함한 모든 자바스크립트 값을 전달할 수 있습니다.

props는 JSX 태그에 전달하는 데이터이며, 아래 예제에서 `className`, `src`, `alt`, `width`, `height`는 img 태그에 전달할 수 있는 몇 가지 프로퍼티입니다.

```jsx
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
};
```

\*\* 아래 예제는 props를 전달하는 컴포넌트와 전달하지 않는 컴포넌트의 간단한 예제입니다.

```jsx
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

```jsx
import { getImageUrl } from "./utils.js";

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl("szV5sdG")}
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
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci
            Medal)
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
          src={getImageUrl("YfeOqp2")}
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
            <b>Discovered: </b>a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

---

### 과제 1

```jsx
/** 컴포넌트 추출하기 */

// utils.js
function getImageUrl(imageId, size = "s") {
  return "https://i.imgur.com/" + imageId + size + ".jpg";
}

// 추출한 컴포넌트
const Profile = ({ person }) => {
  const profile =
    person === "maria"
      ? {
          name: "Maria Skłodowska-Curie",
          imageId: "szV5sdG",
          profession: "physicist and chemist",
          awards:
            "(Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)",
          discovered: "polonium (element)",
        }
      : {
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
          profession: "geochemist",
          awards: "(Miyake Prize for geochemistry, Tanaka Prize)",
          discovered: "a method for measuring carbon dioxide in seawater",
        };

  return (
    <section className="profile">
      <h2>{profile.name}</h2>
      <img
        className="avatar"
        src={getImageUrl(profile.imageId)}
        alt={datprofilea.name}
        width={70}
        height={70}
      />
      <ul>
        <li>
          <b>Profession: </b>
          {profile.profession}
        </li>
        <li>
          <b>Awards: 4 </b>
          {profile.awards}
        </li>
        <li>
          <b>Discovered: </b>
          {profile.discovered}
        </li>
      </ul>
    </section>
  );
};

// 메인 컴포넌트
export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={"maria"} />
      <Profile person={"katsuko"} />
    </div>
  );
}
```

### 과제 2

```jsx
/** props를 기준으로 이미지 조정해보기
 *  단순 확인 과제 (작업 X)
 */

// utils.js
function getImageUrl(person, size) {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, "b")}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

// 메인 컴포넌트
export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{
        name: "Gregorio Y. Zara",
        imageId: "7vQD0fP",
      }}
    />
  );
}
```

### 과제 3

```jsx
/** children 전달하기 */

const Card = ({ cardType, children }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{cardType}</h1>
        {children}
      </div>
    </div>
  );
};

// 메인 컴포넌트
export default function Profile() {
  return (
    <div>
      <Card cardType="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={70}
          height={70}
        />
      </Card>
      <Card cardType="About">
        <p>
          Aklilu Lemma was a distinguished Ethiopian scientist who discovered a
          natural treatment to schistosomiasis.
        </p>
      </Card>
    </div>
  );
}
```

end.
