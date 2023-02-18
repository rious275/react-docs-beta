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
