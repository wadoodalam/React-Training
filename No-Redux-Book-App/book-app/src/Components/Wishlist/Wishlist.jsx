import React from 'react';

export default function Wishlist({ bookTitle, wishDelete }) {
  //console.log(bookTitle);
  return (
    <div>
      WishList: {bookTitle.length}
      {bookTitle.map((book) => (
        <ul>
          Book: {book} 
          <button onClick={() => { wishDelete(book); }}>Delete</button>
        </ul>
      ))}

    </div>
  );
}
