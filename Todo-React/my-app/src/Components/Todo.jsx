import React, { Component, useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";

class Todo extends Component {
    static contextType = TodoContext;

    state = {
        editFlag: false,
        editVal: this.props.todo.title,
    };

    handleEdit = () => {
        const { todo } = this.props;
        const { editVal } = this.state;
        const { updateHandler } = this.context;

        updateHandler(todo.id, editVal);
        this.setState({ editFlag: false });
    };

    render() {
        const { todo } = this.props;
        const { editFlag, editVal } = this.state;
        const { deleteHandler } = this.context;
        if(editFlag) {
            return (
                <div>
                    <input value={editVal} onChange={(e) => { this.setState({editVal: e.target.value}) }} />
                    <button onClick={this.handleEdit}>Save</button>
                </div>                
            )
        } else {
            return (
                <div>
                    <span>{todo.title}</span>
                    <button onClick={() => { this.setState({editFlag: true})}}>Edit</button>
                    <button onClick={() => { deleteHandler(todo.id); }}>Delete</button>
                </div>
            )
        }
    }
}
export default Todo
/*
Functional Todo component
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
*/