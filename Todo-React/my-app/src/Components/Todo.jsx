import React, { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

export default function Todo({ todo }) {
    const { deleteHandler } = useContext(TodoContext);
    return (
        <div>
            <span>{todo.title}</span>
            <button onClick={() => { deleteHandler(todo.id); }}>Delete</button>
        </div>
    );
}