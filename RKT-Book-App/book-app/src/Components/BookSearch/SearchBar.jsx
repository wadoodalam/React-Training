import React, { useCallback, useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import "./SearchBar.css";


export default function SearchBar({ onSubmitButton, setSelectedBook }) {
    const [inputVal, setInputVal] = useState([]);

    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const globalBooks = useSelector((state) => state.books.books);
    const searchEle = useRef(null);
    const [activeOptions, setActiveOptions] = useState(0);



    const onSubmitDebouncer = useCallback(_.debounce((val) => {
        onSubmitButton(val);
    }, 1000), [onSubmitButton]);

    const handleChange = (e) => {
        setInputVal(e.target.value);
        //onSubmitButton(e.target.value);
        onSubmitDebouncer(e.target.value);
        setSelectedBook(null);
        setShowAutocomplete(true)
    };

    const handleClick = () => {
        setShowAutocomplete(true);
    };

    const handleSuggestionClick = (e, book) => {
        setSelectedBook(book);
        setShowAutocomplete(false);
    };

    const handleClickOutside = (e) => {
        if (searchEle.current && !searchEle.current.contains(e.target)) {
            setShowAutocomplete(false);
        }
    };

    const handleKeyDown = (e) => {
        console.log(e.key);
        switch (e.key) {
            case 'ArrowDown':
                setActiveOptions((prev) => (prev < globalBooks.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                setActiveOptions((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case 'Enter':
                setSelectedBook(globalBooks[activeOptions]);
                setShowAutocomplete(false);
                break;
            case 'Escape':
                setShowAutocomplete(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div ref={searchEle}>
            <input
                onChange={handleChange}
                value={inputVal}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            />
            <button style={{ backgroundColor: '#008CBA', color: 'white' }}
                onClick={() => onSubmitButton(inputVal)}>
                Submit
            </button>

            {showAutocomplete && (
                <ul className='autocomplete'>
                    {globalBooks?.map((book, index) => (
                        <li
                            key={book.id}
                            onClick={(e) => handleSuggestionClick(e, book)}
                            className={`option ${index === activeOptions ? "active-option" : ""}`}>
                            {book.volumeInfo.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
