import React, { useState } from 'react';
import type { Todo } from '../types';
import '../App.css';

interface CalendarProps {
    todos: Todo[];
    selectedDate: string | null;
    onSelectDate: (date: string | null) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ todos, selectedDate, onSelectDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const formatDate = (d: number) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // Check if a date has todos
    const hasTodos = (dateStr: string) => {
        return todos.some(todo => todo.date === dateStr && !todo.completed);
    };

    const renderDays = () => {
        const days = [];
        // Empty cells for days before the first day of month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = formatDate(d);
            const isSelected = selectedDate === dateStr;
            const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
            const hasTask = hasTodos(dateStr);

            days.push(
                <div
                    key={d}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${hasTask ? 'has-task' : ''}`}
                    onClick={() => onSelectDate(isSelected ? null : dateStr)}
                >
                    {d}
                    {hasTask && <span className="task-dot"></span>}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="glass-panel calendar-card">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="cal-nav-btn">&lt;</button>
                <h3>{months[month]} {year}</h3>
                <button onClick={handleNextMonth} className="cal-nav-btn">&gt;</button>
            </div>
            <div className="calendar-weekdays">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="calendar-grid">
                {renderDays()}
            </div>
            {selectedDate && (
                <button className="clear-filter-btn" onClick={() => onSelectDate(null)}>
                    Show All Tasks
                </button>
            )}
        </div>
    );
};
