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
