import { useState, useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

function TodoForm() {
    const [inputVal, setInputVal] = useState("");
    const { addNewTodo } = useContext(TodoContext);

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    };

    return (
        <div>
            <input value={inputVal} onChange={handleInputChange} />
            <button onClick={() => { addNewTodo(inputVal); }}>Add Todo</button>
        </div>
    );
}

export default TodoForm;