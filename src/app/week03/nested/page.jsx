'use client';
//

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana1',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};

let obj3 = {
  name: 'Copycat',
  artwork: {
    title: 'Blue Nana2',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};

export default function Nested() {
  console.log(obj2, obj3);
  return (
    <div>1</div>
  )
}
