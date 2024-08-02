import "./App.css";
import { useState, useContext, useEffect, Component } from 'react';
import Todo from './Components/Todo';
import { TodoContext } from "./Context/TodoContext";
import TodoForm from './Components/TodoForm';
//import { getTodos, deleteTodo, addTodo, updateTodo } from "./Apis/TodoApis";
import TodoApi from "./Apis/TodoApis";


class App extends Component {
  state = {
    todos: [],
    editTodo: null,
    todoAPI: new TodoApi(),

  };

  async componentDidMount() {
    try {

      const todos = await this.state.todoAPI.getTodos();
      this.setState({ todos });
    } catch (error) {
      throw error;
    }
  }

  addNewTodo = async (newTodoVal) => {
    try {
      const newTodo = await this.state.todoAPI.addTodo({ title: newTodoVal });
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo]
      }));
    } catch (error) {
      throw error;
    }
  };


  deleteHandler = async (id) => {
    try {
      await this.state.todoAPI.deleteTodo(id);

      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo.id !== id)
      }));
    } catch (error) {
      throw error;
    }
  };

  updateHandler = async (id, updatedTitle) => {
    try {
      const updatedTodoFromServer = await this.state.todoAPI.updateTodo(id, { title: updatedTitle });
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => todo.id === id ? updatedTodoFromServer : todo),
        editTodo: null,
      }));

    } catch (error) {
      throw error;
    }
  };

  render() {
    const { todos } = this.state;
    return (
      <TodoContext.Provider value={{
        todos: this.state.todos,
        addNewTodo: this.addNewTodo,
        deleteHandler: this.deleteHandler,
        updateHandler: this.updateHandler,
      }}>
        <div>
          <TodoForm />
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          ))}
        </div>


      </TodoContext.Provider>
    );
  }
}

/*
Todo list with functional components
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
*/
export default App;
