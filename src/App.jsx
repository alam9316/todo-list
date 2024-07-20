import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./styles.css";
const LOCAL_STORAGE_ITEMS_NAME = "TODO_LIST_ITEMS";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem(LOCAL_STORAGE_ITEMS_NAME);
    if (localValue) return JSON.parse(localValue);
    return [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ITEMS_NAME, JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false }
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
