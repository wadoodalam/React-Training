import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './Slices/BookSlice';
const store = configureStore({
    reducer: {
        books: bookReducer
    }

});

export default store;