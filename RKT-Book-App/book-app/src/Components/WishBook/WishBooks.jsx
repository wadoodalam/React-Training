import React from 'react';

export default function Wishlist({ books, DeleteWishBook }) {

    return (

        <div>
            <h2>Wishlist: {books.length}</h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {books.map((book) => (
                <div key={book.id} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ marginRight: '10px' }}>{book.volumeInfo.title}</span>
                  <button onClick={() => DeleteWishBook(book)}>delete</button>
                </div>
              ))}
            </ul>
          </div>
    );
}