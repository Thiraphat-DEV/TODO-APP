import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
const App = () => {
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState({});

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      return JSON.parse(saveTodos); //compare string to JS
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); //compare JS to JSONstring
  }, [todos]);
  function HandleUpdateTodo(id, updateList) {
    const updateTodos = todos.map(todo => {
      return todo.id === id ? updateList : todo;
    }) 
    setEdit(false);
    setTodos(updateTodos);
    
  }

  function HandleEditSubmit(e) {
    e.preventDefault();
    HandleUpdateTodo(current.id, current);
    
  }

  function HandleEdit(e) {
    setCurrent({ ...current, text: e.target.value });
    console.log("Current", current);
  }

  function HandleInput(e) {
    setTodo(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault(); //protect to page refresh
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(), //delete space
        },
      ]);
    }
    setTodo("");
  }

  function HandleDelete(id) {
    const removeTodo = todos.filter((todo) => {
      // Eslint-disable-next-line
      return todo.id !== id;
    });
    setTodos(removeTodo);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>

      {edit ? (
        <form onSubmit={HandleEditSubmit}>
          <h2>Edit TodoList</h2>
          <label htmlFor="edit">Edit: </label>
          <input
            type="text"
            name="edit"
            placeholder="editTodoList"
            value={current.text}
            onChange={HandleEdit}
          />
          <button type="submit" className="btn">
            UpdateTODOLIST
          </button>
          <button onClick={() => setEdit(false)}>EDIT</button>
        </form>
      ) : (
        <form onSubmit={HandleSubmit}>
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Create LIST"
            value={todo}
            onChange={HandleInput}
          />
          <button type="submit" className="btn">
            ADD TODOLIST
          </button>
        </form>
      )}
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button className="btn" onClick={() => HandleDelete(todo.id)}>
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
