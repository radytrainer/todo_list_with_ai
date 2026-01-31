import React from 'react';
import type { Todo } from '../types';
import '../App.css';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <label className="todo-label">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="todo-checkbox"
                />
                <span className="custom-checkbox"></span>
                <div className="todo-content">
                    <span className="todo-text">{todo.text}</span>
                    {todo.date && (
                        <span className="todo-date">
                            📅 {new Date(todo.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                    )}
                </div>
            </label>
            <button
                className="delete-btn"
                onClick={(e) => {
                    e.preventDefault(); // Prevent label toggle
                    onDelete(todo.id);
                }}
                aria-label="Delete todo"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    );
};
