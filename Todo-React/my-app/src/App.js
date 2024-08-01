import "./App.css";
import { useState, useContext, useEffect } from 'react';
import Todo from './Components/Todo';
import { TodoContext } from "./Context/TodoContext";
import TodoForm from './Components/TodoForm';
import { getTodos, deleteTodo, addTodo, updateTodo } from "./Apis/TodoApis";


const baseURL = "http://localhost:3000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        throw error;
      }

    };
    fetchTodos();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const addNewTodo = async (newTodoVal) => {
    try {
      const addedTodo = await addTodo({ title: newTodoVal });
      setTodos([...todos, addedTodo]);
    } catch (error) {
      throw error;
    }
  };

  const updateHandler = async (id, updatedTitle) => {
    try {
      const updatedTodoFromServer = await updateTodo(id, { title: updatedTitle });
      setTodos(todos.map(todo => todo.id === id ? updatedTodoFromServer : todo));
      setEditingTodo(null);
    } catch (error) {
      throw error;
    }
  };

  const todoRenderFlag = true;

  return (

    <TodoContext.Provider value={{ todos, setTodos, deleteHandler, addNewTodo, updateHandler }}>
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