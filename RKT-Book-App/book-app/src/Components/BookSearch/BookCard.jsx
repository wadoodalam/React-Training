import React from 'react';

export default function BookCard({ book, AddWishBooks }) {
    //console.log(typeof (book));
    return (
        <ul>
            <div>
                <img src={book.volumeInfo.imageLinks?.thumbnail} />
                <h4>Title: {book.volumeInfo.title}</h4>
                <p>Authors: {book.volumeInfo.authors}</p>
                <p>Publisher: {book.volumeInfo.publisher}</p>
                <p>Published Date: {book.volumeInfo.publishedDate}</p>
                <p>Description: {book.volumeInfo.description}</p>
                <button onClick={() => { AddWishBooks(book); }}>Add To Wishlist</button>
            </div>
        </ul>
    );
}
