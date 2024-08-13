import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('book/fetchBooks', async (bookQuery) => {
    if (bookQuery.trim() !== "") {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookQuery}&startIndex=0&maxResults=20`);
        const data = await response.json();
        return data.items;

    } else {
        return [];
    }
});

const bookSlice = createSlice({
    //name, init state, reducers, extra reducers for api thunk
    name: 'books',
    initialState: {
        books: [],
        wishBooks: [],
        status: 'idle',
    },
    reducers: {
        addToWishBook: (state, action) => {
            //console.log(action.payload);
            if (!state.wishBooks.find((wishbook) => wishbook.id === action.payload.id)) {
                state.wishBooks.push(action.payload);
            }
        },
        removeFromWishBooks: (state, action) => {
            const newWishBooks = state.wishBooks.filter((wishBook) => wishBook.id !== action.payload.id);
            state.wishBooks = newWishBooks;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //console.log(action.payload);
                state.books = action.payload;
            });
    }
});

export const { addToWishBook, removeFromWishBooks } = bookSlice.actions;
export default bookSlice.reducer;