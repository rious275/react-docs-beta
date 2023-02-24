'use client'
const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

const PlayButton = ({ movieName }) => {
  const handlePlayClick = () => {
    alert(`Playing ${movieName}!`);
  };

  return (
    <Button onClick={handlePlayClick}>
      Play {movieName}
    </Button>
  );
}

const UploadButton = () => {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

const Toolbar = () => {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
export default Toolbar;