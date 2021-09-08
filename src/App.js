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
    <div class="flex h-screen w-full text-center bg-blue-400">
      <div class=" bg-white w-full rounded shadow-lg p-8 m-4 max-w-screen-sm mx-auto">
        <h2 class="text-2xl font-semibold text-gray-900 my-5">
          QUOTES OF THE DAY
        </h2>
        <h3 class="text-red-500 text-3xl">"{text}"</h3>
        <h3 class="text-gray-900 text-xl font-semibold">{author}</h3>
        <form class="max-w-screen-sm" onSubmit={addTodo}>
          <div className="flex flex-col mb-4">
            <h1 class="text-gray-900 text-2xl font-semibold my-5">
              Todo List Project
            </h1>
          </div>
          <div className="flex flex-col mb-4">
            <input
              class="border py-2 px-3 text-grey-darkest"
              type="text"
              name="todo"
            />
          </div>
          <div className="flex flex-col mb-4">
            <input
              class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
              type="submit"
            />
          </div>
        </form>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.id !== inputEditing ? (
              <p class="text-blue-900 font-bold text-2xl">{todo.text}</p>
            ) : (
              <form onSubmit={(event) => submitEdits(event, todo.id)}>
                <input
                  class="bg-gray-200 text-blue py-2 px-4 rounded"
                  name="todo"
                  defaultValue={todo.text}
                />
                <button
                  class="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-800 font-bold my-3 mx-3"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            <button
              class="bg-red-500 text-white rounded py-2 px-4 hover:bg-red-800 font-bold my-3 mx-3"
              onClick={() => deleteTodo(todo.id)}
            >
              delete
            </button>
            <button
              class="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-800 font-bold my-3 mx-3"
              onClick={() => setInputEditing(todo.id)}
            >
              edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
