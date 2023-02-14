export const Profile = () => {
  return (
    <picture>
      <img
          src="https://i.imgur.com/MK3eW3As.jpg"
          alt="Katherine Johnson"
      />
    </picture>
  );
}

const Gallery = () => {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
export default Gallery;