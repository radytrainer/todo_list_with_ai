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
                <div className="login-icon-wrapper">
                    <span className="login-icon">✨</span>
                </div>

                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p className="login-subtitle">Enter your details to access your workspace</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-input-group">
                        <span className="input-icon">👤</span>
                        <input
                            type="text"
                            className="login-input-field"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            autoFocus
                        />
                    </div>
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span> {error}
                        </div>
                    )}

                    <button type="submit" className="login-btn-primary">
                        <span>Continue to Dashboard</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </form>

                <div className="login-footer">
                    <p>Protected by secure local storage</p>
                </div>
            </div>
        </div>
    );
};
