import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [darkMode, setDarkMode] = useState(false);

  // Применение темы
  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg-color', '#1a202c');
      root.style.setProperty('--text-color', '#e2e8f0');
      root.style.setProperty('--container-bg', '#2d3748');
      root.style.setProperty('--border-color', '#4a5568');
    } else {
      root.style.setProperty('--bg-color', '#f7fafc');
      root.style.setProperty('--text-color', '#1a202c');
      root.style.setProperty('--container-bg', '#ffffff');
      root.style.setProperty('--border-color', '#e2e8f0');
    }
  };

  // Переключение темы
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
  };

  // Добавление задачи
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue('');
    }
  };

  // Удаление задачи
  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Переключение статуса задачи
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Очистка выполненных задач
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Фильтрация задач
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Подсчет оставшихся задач
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '30px auto',
      padding: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: 'var(--container-bg)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      color: 'var(--text-color)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
    },
    title: {
      margin: '0',
      fontSize: '28px',
      fontWeight: '600',
      color: 'var(--text-color)',
    },
    themeToggle: {
      padding: '8px 15px',
      backgroundColor: darkMode ? '#4a5568' : '#edf2f7',
      color: darkMode ? '#f7fafc' : '#2d3748',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
    },
    inputContainer: {
      display: 'flex',
      marginBottom: '25px',
      gap: '10px',
    },
    input: {
      flex: '1',
      padding: '12px 15px',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: darkMode ? '#4a5568' : '#f7fafc',
      color: darkMode ? '#f7fafc' : '#1a202c',
      transition: 'all 0.2s ease',
      outline: 'none',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 15px',
      backgroundColor: darkMode ? '#4a5568' : '#edf2f7',
      marginBottom: '10px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
    },
    todoText: {
      flex: '1',
      wordBreak: 'break-word',
      textDecoration: 'none',
      marginLeft: '10px',
    },
    completedText: {
      textDecoration: 'line-through',
      color: darkMode ? '#a0aec0' : '#718096',
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      paddingTop: '15px',
      borderTop: '1px solid var(--border-color)',
    },
    filterButtons: {
      display: 'flex',
      gap: '10px',
    },
    filterButton: {
      padding: '5px 10px',
      backgroundColor: 'transparent',
      color: 'var(--text-color)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
    },
    activeFilterButton: {
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
    },
    clearButton: {
      padding: '5px 10px',
      backgroundColor: 'transparent',
      color: 'var(--text-color)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
    },
    emptyMessage: {
      color: darkMode ? '#a0aec0' : '#718096',
      textAlign: 'center',
      padding: '30px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>todos</h1>
        <button
          onClick={toggleTheme}
          style={styles.themeToggle}
          aria-label={darkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="What needs to be done?"
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.button}>
          Добавить
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p style={styles.emptyMessage}>
          {filter === 'all'
            ? 'Нет задач'
            : filter === 'active'
            ? 'Нет активных задач'
            : 'Нет выполненных задач'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map((todo) => (
            <li key={todo.id} style={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  ...styles.todoText,
                  ...(todo.completed ? styles.completedText : {}),
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                style={{
                  ...styles.button,
                  backgroundColor: '#e53e3e',
                  padding: '6px 12px',
                }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <div style={styles.filterContainer}>
          <div>
            {activeTodosCount} {activeTodosCount === 1 ? 'item left' : 'items left'}
          </div>
          <div style={styles.filterButtons}>
            <button
              style={{
                ...styles.filterButton,
                ...(filter === 'all' ? styles.activeFilterButton : {}),
              }}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(filter === 'active' ? styles.activeFilterButton : {}),
              }}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(filter === 'completed' ? styles.activeFilterButton : {}),
              }}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <button
            style={styles.clearButton}
            onClick={clearCompleted}
            disabled={!todos.some((todo) => todo.completed)}
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;