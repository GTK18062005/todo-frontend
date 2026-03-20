import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const API = "https://todo-backend-2-ikfq.onrender.com/api/todos";

  const fetchTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    setTask("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 Todo App</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map((t) => (
            <li key={t.id} className="todo-item">
              <span>{t.task}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(t.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;