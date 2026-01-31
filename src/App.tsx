import { useState, useEffect } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { Login } from './components/Login';
import { Calendar } from './components/Calendar';
import type { Todo } from './types';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('currentUser');
  });

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Load todos when user changes
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`todos_${user} `);
      if (saved) {
        try {
          setTodos(JSON.parse(saved));
        } catch (e) {
          setTodos([]);
        }
      } else {
        setTodos([]);
      }
    } else {
      setTodos([]);
    }
  }, [user]);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user} `, JSON.stringify(todos));
    }
  }, [todos, user]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const handleLogin = (username: string) => {
    localStorage.setItem('currentUser', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAddTodo = (text: string, date?: string) => {
    // Check for duplicates (case-insensitive)
    const isDuplicate = todos.some(
      todo => todo.text.toLowerCase() === text.toLowerCase()
    );

    if (isDuplicate) {
      alert('This task already exists!');
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
      date,
    };
    setTodos([newTodo, ...todos]);
    setFilter('all'); // Reset filter to show new item
    // Don't reset selectedDate so user can see their added task if they are on that day, or see it in 'all'
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    // Adding a simple confirm for better UX
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  if (!user) {
    return (
      <>
        {/* Toggle Theme on Login Page too */}
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <Login onLogin={handleLogin} />
      </>
    );
  }

  const activeCount = todos.filter(t => !t.completed).length;
  const totalCount = todos.length;
  const completedCount = totalCount - activeCount;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const filteredTodos = todos.filter(todo => {
    // Date filter takes precedence or ANDs with status filter?
    // Let's make Date filter act as a view context.
    if (selectedDate && todo.date !== selectedDate) return false;

    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="content-grid">
        {/* Left Column: Calendar */}
        <section className="calendar-section">
          <Calendar
            todos={todos}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </section>

        {/* Right Column: Todo List */}
        <div className="glass-panel main-card">
          <header className="app-header">
            <div className="header-top">
              <div className="header-title-group">
                <h1>{selectedDate ? `Date: ${selectedDate}` : 'My Tasks'}</h1>
                <p className="header-greeting">Welcome back, <span className="username-highlight">{user}</span></p>
              </div>

              <div className="header-actions">
                <div className="digital-clock">
                  {formatTime(currentTime)}
                </div>
                <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button onClick={handleLogout} className="logout-btn-icon" title="Logout">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="header-stats-row">
              <div className="stat-item">
                <span className="stat-value">{activeCount}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="progress-container-wrapper">
                <div className="progress-info">
                  <span className="progress-text">{progress}% Done</span>
                </div>
                <div className="progress-bar-container" title={`${progress}% completed`}>
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          </header>

          <AddTodo onAdd={handleAddTodo} />

          <div className="filter-tabs">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <span className="filter-icon">📋</span>
              All
              <span className="filter-count">{totalCount}</span>
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              <span className="filter-icon">⚡</span>
              Active
              <span className="filter-count">{activeCount}</span>
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              <span className="filter-icon">✅</span>
              Completed
              <span className="filter-count">{completedCount}</span>
            </button>
          </div>

          <div className="list-container">
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
