'use client';
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(x => x + 1);
        setNumber(x => x + 1);
        setNumber(x => x + 1);
      }}>+3</button>
    </>
  )
}
