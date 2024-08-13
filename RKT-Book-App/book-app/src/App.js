import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/BookSearch/SearchBar';
import SearchResults from './Components/BookSearch/SearchResults';
import Wishlist from './Components/WishBook/WishBooks';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addToWishBook, removeFromWishBooks } from './Redux/Slices/BookSlice';
import Loader from './Components/BookSearch/Loader';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const globalBooks = useSelector((state) => state.books.books);
  const wishBooks = useSelector((state) => state.books.wishBooks);
  const status = useSelector((state) => state.books.status);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleFetchBooks = async (bookQuery) => {
    dispatch(fetchBooks(bookQuery));
  };

  const handleWishAddBook = (book) => {
    dispatch(addToWishBook(book));
  };

  const onDeleteWishBook = (book) => {
    dispatch(removeFromWishBooks(book));
  };

  console.log(selectedBook);
  return (
    <div className="App">
      <div className='results'>
        <SearchBar 
          onSubmitButton={handleFetchBooks} 
          setSelectedBook={setSelectedBook} 
          />
        {
          status === 'loading' ? <Loader />
            : status === 'succeeded' ? 
            (<SearchResults books={selectedBook ? [selectedBook] : globalBooks} AddWishBooks={handleWishAddBook} />)
              : null
        }
      </div>
      <div className='wishlist'>
        <Wishlist books={wishBooks} DeleteWishBook={onDeleteWishBook} />
      </div>
    </div>
  );
}

export default App;
