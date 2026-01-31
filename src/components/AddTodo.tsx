import React, { useState } from 'react';
import '../App.css'; // We will put styles here

interface AddTodoProps {
    onAdd: (text: string, date?: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text, date || undefined);
            setText('');
            setDate('');
            setIsExpanded(false);
        }
    };

    return (
        <form
            className={`add-todo-form ${isExpanded ? 'expanded' : ''}`}
            onSubmit={handleSubmit}
            onFocus={() => setIsExpanded(true)}
        >
            <div className="input-wrapper">
                <div className="input-main-row">
                    <input
                        type="text"
                        className="add-todo-input-text"
                        placeholder="What needs to be done?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <button type="submit" className="add-todo-btn" aria-label="Add task">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

                <div className={`input-tools ${isExpanded || text || date ? 'visible' : ''}`}>
                    <div className="date-picker-wrapper">
                        <label className="tool-label" title="Set Due Date">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <input
                                type="date"
                                className="add-todo-date-native"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <span className="date-display">
                                {date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Due date'}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};
