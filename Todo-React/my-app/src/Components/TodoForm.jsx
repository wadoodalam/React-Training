import { useState, useContext, Component } from "react";
import { TodoContext } from "../Context/TodoContext";

class TodoForm extends Component {
    static contextType = TodoContext;
    state = {
        inputVal: ""
    };

    handleInputChange = (e) => {
        this.setState({ inputVal: e.target.value });
    };
    render() {
        const { addNewTodo } = this.context;
        const { inputVal } = this.state;
        return (
            <div>
                <input value={inputVal} onChange={this.handleInputChange} />
                <button onClick={() => { addNewTodo(inputVal); }}>Add Todo</button>
            </div>
        );
    }

}

/*
Functional todoform
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
*/
export default TodoForm;