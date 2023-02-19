# Passing Props to a Component
프로퍼티는 JSX 태그에 전달하는 정보를 말함.  
```<img>``` 등 기존 태그에 전달할 수 있는 프로퍼티는 미리 정의되어 있음. 하지만 자체 컴포넌트에는 함수의 인자로 사용자 정의 프로퍼티를 전달할 수 있음.  

🤔 디스트럭처링이 함수의 인자를 받는 것과 동일하다면 쓰지 말란 이야기인가?
```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

프로퍼티를 모두 전달하기 보다는 스프레드 문법을 쓰는게 효율적인 경우도 있으나 사용에 주의가 필요함. 과도하게 사용하지 말 것.
```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```
## children
컴포넌트 내에 다른 컴포넌트를 불러올땐 children 프로퍼티를 사용하여 불러옴. 스벨트의 slot 같은 개념.  
이름 바꿔서 해도 되나 테스트해보니 안됨.😁

## 상태변경
프로퍼티를 변경하면 상태 변경이 필요함. 프로퍼티를 변경하려 하지 말 것.  

### 과제 1
```jsx
import { getImageUrl } from './utils.js';

const Profile = ({name, imageUrl, imageAlt, imageWidth, imageHeight, profession, awardCount, awardList, discovered}) => {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageUrl)}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
      />
      <ul>
        <li>
          <b>Profession: </b> 
          {profession}
        </li>
        <li>
          <b>Awards: {awardCount} </b> 
          ({awardList})
        </li>
        <li>
          <b>Discovered: </b>
          {discovered}
        </li>
      </ul>
    </section>
  );
}

const Gallery = () => {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        name="Maria Skłodowska-Curie"
        imageUrl="szV5sdG"
        imageAlt="Maria Skłodowska-Curie"
        imageWidth="70"
        imageHeight="70"
        profession="physicist and chemist"
        awardCount="4"
        awardList="Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal"
        discovered="polonium (element)"
      />
      <Profile
        name="Katsuko Saruhashi"
        imageUrl="YfeOqp2"
        imageAlt="Katsuko Saruhashi"
        imageWidth="70"
        imageHeight="70"
        profession="geochemist"
        awardCount="2"
        awardList="Miyake Prize for geochemistry, Tanaka Prize"
        discovered="a method for measuring carbon dioxide in seawater"
      />
    </div>
  );
}
export default Gallery;
```

### 과제 2
```jsx
import { getImageUrl } from "./utils.js";

const Avatar = ({ person, size }) => {
  const imageSize = size < 90 ? "s" : "b";
  return (
    <img
      className="avatar"
      src={getImageUrl(person, imageSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
};

const Profile = () => {
  return (
    <Avatar
      size={40}
      person={{
        name: "Gregorio Y. Zara",
        imageId: "7vQD0fP"
      }}
    />
  );
};
export default Profile;
```

### 과제 3 
```jsx
const Card = ({children}) => {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

const Profile = () => {
  return (
    <div>
      <Card>
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
      </Card>
      <Card>
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
export default Profile;
```