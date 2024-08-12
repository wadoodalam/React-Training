import React from 'react';
import BookCard from './BookCard';
export default function SearchResults({ books, AddWishBooks }) {
    //console.log(typeof (books));
    return (
        <div>
            <h2>Results</h2>
            {books?.map((book) => (
                <BookCard book={book} key={book.id} AddWishBooks={AddWishBooks} />
            ))}
        </div>
    );
}