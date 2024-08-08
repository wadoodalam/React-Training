import React from 'react';

export default function Car({ car, sellCarHandler }) {
  return (
    <div>
      <div>{car.name}</div>
      <div>{car.quantity}</div>
      <button onClick={() => sellCarHandler(car.id)}>Sell</button>
    </div>
  );
}
