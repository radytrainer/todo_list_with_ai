import React, { useState } from 'react';
import '../App.css';

interface LoginProps {
    onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim().length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }
        onLogin(username.trim());
    };

    return (
        <div className="login-container">
            <div className="glass-panel login-card">
                <h1>Welcome Back</h1>
                <p className="login-subtitle">Enter your username to manage your tasks</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            className="add-todo-input login-input"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="add-todo-btn login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
