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
