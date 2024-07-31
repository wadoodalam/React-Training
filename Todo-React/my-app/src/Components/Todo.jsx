import React from "react";

export default function Todo({ title, deleteHandler, id }) {
    //console.log(id);
    return (
        <div>
            <span>{title}</span>
            <button onClick={() => deleteHandler(id)}>Delete</button>
        </div>
    );
}