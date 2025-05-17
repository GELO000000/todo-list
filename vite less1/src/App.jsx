import React, { createContext, useState } from 'react';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'I will wake up at 8 in the morning', completed: false },
    { id: 2, text: 'I will practice html for 1 hour', completed: false },
    { id: 3, text: 'I will give time for 2 hours css', completed: false },
    { id: 4, text: 'Then I will have breakfast', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <TodoContext.Provider value={{ todos, toggleTodo, deleteTodo, addTodo, newTodo, setNewTodo, handleKeyPress }}>
      {children}
    </TodoContext.Provider>
  );
};

const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, addTodo, newTodo, setNewTodo, handleKeyPress } = React.useContext(TodoContext);

  return (
    <div className="app-container">
      <div className="todo-box">
        <div className="input-group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>
        <ul className="task-list">
          {todos.map(todo => (
            <li key={todo.id} className="task-item">
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleTodo(todo.id)} 
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="#1565C0" strokeWidth="2"/>
                  <path d="M6 6L18 18" stroke="#1565C0" strokeWidth="2"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
};

export default App;