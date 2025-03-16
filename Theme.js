import React, { useState } from 'react';

const Theme = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
   
   
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(newTasks);
    };

    const startEditing = (index) => {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setTask(tasks[index]);
    };

    const saveTask = () => {
        if (task.trim()) {
            const updatedTasks = tasks.map((t, index) =>
                index === currentTaskIndex ? task : t
            );
            setTasks(updatedTasks);
            setTask('');
            setIsEditing(false);
            setCurrentTaskIndex(null);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h1>To-Do List</h1>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                    style={{ padding: '8px', width: '70%' }}
                />
                {isEditing ? (
                    <button onClick={saveTask} style={{ padding: '8px', marginLeft: '10px' }}>
                        Save
                    </button>
                ) : (
                    <button onClick={addTask} style={{ padding: '8px', marginLeft: '10px' }}>
                        Add
                    </button>
                )}
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tasks.map((t, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    >
                        {t}
                        <div>
                            <button onClick={() => startEditing(index)} style={{ marginLeft: '10px' }}>
                                Edit
                            </button>
                            <button onClick={() => removeTask(index)} style={{ marginLeft: '10px' }}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Theme;