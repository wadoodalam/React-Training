import React, { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";

export default function Todo({ todo }) {
    const { deleteHandler, updateHandler } = useContext(TodoContext);
    const [editFlag, setEditFlag] = useState(false);
    const [editVal, setEditVal] = useState(todo.title);

    const handleEdit = () => {
        updateHandler(todo.id, editVal);
        setEditFlag(false);
    };
    if (editFlag) {
        return (
            <div>
                <input value={editVal} onChange={(e) => { setEditVal(e.target.value); }} />
                <button onClick={handleEdit}>Save</button>
            </div>
        );
    } else {
        return (
            <div>
                <span>{todo.title}</span>
                <button onClick={() => { setEditFlag(true); }}>Edit</button>
                <button onClick={() => { deleteHandler(todo.id); }}>Delete</button>
            </div>
        );
    }
}