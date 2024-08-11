import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import SearchBar from './Components/Search/SearchBar';
import SearchResults from './Components/Search/SearchResults';
import Wishlist from './Components/Wishlist/Wishlist';

function App() {
  const [globalBooks, setGlobalBooks] = useState([]);
  const [globalWishBooks, setGlobalWishBooks] = useState([]);

  const SubmitToAPI = async (bookQuery) => {
    if (bookQuery.trim()) {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookQuery}&startIndex=0&maxResults=20`);
      const data = await response.json();
      //console.log(data.items);
      setGlobalBooks(data.items);
      //console.log(globalBooks);
    } else {
      setGlobalBooks([]);
    }
  };

  const AddToWishlist = (bookTitle) => {
    if (!globalWishBooks.find((book) => book === bookTitle)) {
      setGlobalWishBooks([...globalWishBooks, bookTitle]);
    }
    
  };

  const handleDelete = (bookTitle) => {
    const newWishBooks = globalWishBooks.filter((book) => book !== bookTitle);
    setGlobalWishBooks(newWishBooks);
  };
  return (
    <div className="App">
      <div className='search-books'>
        <SearchBar onSubmit={SubmitToAPI} />
        <SearchResults books={globalBooks} AddToWishlist={AddToWishlist} />
      </div>
      <div className='wishlist'>
        <Wishlist bookTitle={globalWishBooks} wishDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
