import React, { useState, useEffect } from 'react';

const Theme = () => {
    const [tasks, setTasks] = useState(() =>{
        try {
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            return storedTasks;
        } catch (error) {
            console.error('Error initializing tasks:', error);
            return [];
    }

    }
    );

    const [task, setTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [language, setLanguage] = useState('en'); // Default language is English

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }, [tasks]);

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

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ar' : 'en'));
    };

    const translations = {
        en: {
            title: 'To-Do List',
            placeholder: 'Add a new task',
            add: 'Add',
            save: 'Save',
            edit: 'Edit',
            remove: 'Remove',
            toggleLanguage: 'Switch to Arabic',
        },
        ar: {
            title: 'قائمة المهام',
            placeholder: 'أضف مهمة جديدة',
            add: 'إضافة',
            save: 'حفظ',
            edit: 'تعديل',
            remove: 'حذف',
            toggleLanguage: 'التبديل إلى الإنجليزية',
        },
    };

    const t = translations[language];

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <button onClick={toggleLanguage} style={{ marginBottom: '10px' }}>
                {t.toggleLanguage}
            </button>
            <h1>{t.title}</h1>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder={t.placeholder}
                    style={{ padding: '8px', width: '70%' }}
                />
                {isEditing ? (
                    <button onClick={saveTask} style={{ padding: '8px', marginLeft: '10px' }}>
                        {t.save}
                    </button>
                ) : (
                    <button onClick={addTask} style={{ padding: '8px', marginLeft: '10px' }}>
                        {t.add}
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
                                {translations[language].edit}
                            </button>
                            <button onClick={() => removeTask(index)} style={{ marginLeft: '10px' }}>
                                {translations[language].remove}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Theme;