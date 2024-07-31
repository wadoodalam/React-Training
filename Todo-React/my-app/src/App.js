import "./App.css";
import { useState } from 'react';
import Todo from './Components/Todo';

function App() {
  const [todos, setTodos] = useState([]);

  const deleteHandler = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const addNewTodo = (newTodoVal) => {
    const newTodos = [...todos, { title: newTodoVal, id: Date.now() }];
    setTodos(newTodos);
  };

  const todoRenderFlag = true;

  return (
    <div>
      <TodoForm addNewTodo={addNewTodo} />
      {todoRenderFlag
        ? todos.map((todo, index) => {
          return (
            <Todo
              title={todo.title}
              deleteHandler={deleteHandler}
              key={index}
              id={todo.id}
            />
          );
        })
        : null
      }
    </div>
  );
}

let count = 0;
function TodoForm({ addNewTodo }) {
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    count++;
  };

  return (
    <div>
      <input value={inputVal} onChange={handleInputChange} />
      <button onClick={() => { addNewTodo(inputVal); }}>Add Todo</button>
    </div>
  );
}

export default App;