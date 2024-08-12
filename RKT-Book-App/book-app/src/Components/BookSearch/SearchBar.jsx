import React, { useCallback, useState } from 'react';
import _ from 'lodash';

export default function SearchBar({ onSubmitButton }) {
    const [inputVal, setInputVal] = useState([]);

    const onSubmitDebouncer = useCallback(_.debounce((val) => {
        onSubmitButton(val);
    }, 1000), [onSubmitButton]);

    const handleChange = (e) => {
        setInputVal(e.target.value);
        //onSubmitButton(e.target.value);
        onSubmitDebouncer(e.target.value);
    };
    return (
        <div>
            <input onChange={handleChange} value={inputVal} />
            <button style={{backgroundColor: '#008CBA', color:'white'}} onClick={() => onSubmitButton(inputVal)}>Submit</button>
        </div>
    );
}
