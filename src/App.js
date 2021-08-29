import { useEffect, useState } from "react";
import "./App.css";
import useRandomQuotes from "./useRandomQuotes";

function App() {
  const [text, author] = useRandomQuotes();
  const [todos, setTodos] = useState([]);
  const [inputEditing, setInputEditing] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      text: e.target.todo.value,
    };

    setTodos([...todos, newTodo]);
    e.target.todo.value = "";
  };

  const deleteTodo = (idToDelete) => {
    const filteredTodos = todos.filter((todo) => todo.id !== idToDelete);
    setTodos(filteredTodos);
  };

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const savedTodos = JSON.parse(json);
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);
  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  const submitEdits = (event, idToEdit) => {
    event.preventDefault();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === idToEdit) {
        return {
          id: todo.id,
          text: event.target.todo.value,
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    setInputEditing("");
  };

  return (
    <div>
      <h2>QUOTES OF THE DAY</h2>
      <h3>{text}</h3>
      <h3>{author}</h3>
      <h1>Todo List Project</h1>
      <form onSubmit={addTodo}>
        <input type="text" name="todo" />
        <input type="submit" />
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.id !== inputEditing ? (
            <div>{todo.text}</div>
          ) : (
            <form onSubmit={(event) => submitEdits(event, todo.id)}>
              <textarea name="todo" defaultValue={todo.text}></textarea>
              <button type="submit">Submit Edit</button>
            </form>
          )}
          <button onClick={() => deleteTodo(todo.id)}>delete</button>
          <button onClick={() => setInputEditing(todo.id)}>edit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
