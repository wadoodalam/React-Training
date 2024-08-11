import React, { useCallback, useState } from 'react';
import _ from 'lodash';

export default function SearchBar({ onSubmit }) {
    const [inputVal, setInputVal] = useState("");
    const debounceOnSubmit = useCallback(_.debounce((val) => {
        onSubmit(val);
    }, 1000), []);

    const handleInput = (e) => {
        setInputVal(e.target.value);
        debounceOnSubmit(e.target.value);
    };


    return (
        <div>
            <input onChange={handleInput} value={inputVal} />
            <button onClick={() => { onSubmit(inputVal); }}>Submit</button>
        </div>
    );
}
