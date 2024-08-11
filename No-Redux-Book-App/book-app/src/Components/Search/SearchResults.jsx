import React from 'react';
import BookCard from '../Books/BookCard';

export default function SearchResults({ books, AddToWishlist }) {
    //console.log(books);
    return (
        <div>
            {books?.map((book) => (
                <BookCard book={book} AddToWishlist={AddToWishlist} key={book.id} />
            ))}
        </div>
    );
}
