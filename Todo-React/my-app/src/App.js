import "./App.css";
import { useState, useContext } from 'react';
import Todo from './Components/Todo'; 
import { TodoContext } from "./Context/TodoContext";
import TodoForm from './Components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);


  const deleteHandler = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const addNewTodo = (newTodoVal) => {
    const newTodos = [...todos, { title: newTodoVal, id: todos.length + 1 }];
    setTodos(newTodos);
  };

  const todoRenderFlag = true;

  return (
  
      <TodoContext.Provider value={{ todos, setTodos, deleteHandler, addNewTodo}}>
        <div>
          <TodoForm />
          {todoRenderFlag
            ? todos.map((todo, index) => {
              return (
                <Todo
                  todo={todo}
                  key={index}
                />
              );
            })
            : null}
        </div>
      </TodoContext.Provider>

  );
}



export default App;