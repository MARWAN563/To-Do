import React, { useRef, useState, useEffect } from 'react';

export default function ToDoList() {

    const [items, setItems] = useState(() => {
     try {
            const storedItems = JSON.parse(localStorage.getItem('tasks')) || [];
            return storedItems;
        } catch (error) {
            console.error('Error initializing tasks:', error);
            return [];
        }
    });
    const inputRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

      useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(items));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }, [items]);
    

    const GetValue = () => {
        const inputValue = inputRef.current.value.trim();
        if (!inputValue) return;
        setItems(prevItems => [...prevItems, inputValue]);
        inputRef.current.value = '';
    };

    const HandleRemove = (index) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const HandleEdit = (index) => {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        inputRef.current.value = items[index];
    };

    const SaveEdit = () => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue) {
            setItems(prevItems => 
                prevItems.map((item, i) => i === currentTaskIndex ? inputValue : item)
            );
            setIsEditing(false);
            setCurrentTaskIndex(null);
            inputRef.current.value = '';
        }
    };
    

    return (
        <div id="containerOfProject">
            <div className="containerOfProjectInput">
                <input type="text" ref={inputRef} placeholder="Write Your Mission..." />

                {isEditing ? (
                    <button onClick={SaveEdit} style={{ padding: '8px', marginLeft: '10px' }}>
                        Save
                    </button>
                ) : (
                    <button onClick={GetValue} style={{ padding: '8px', marginLeft: '10px' }}>
                        Add
                    </button>
                )}
            </div>
            <hr style={{ marginTop: '4%', backgroundColor: 'black', height: '2px', width: '100%' }} />

            <div style={{ width: '100%' }}>
                {items.map((item, index) => (
                    <div key={index} className="ContentTODO">
                        <h5>
                            {index}. {item}
                        </h5>

                        <div id="EandRbutton">
                            <button
                                onClick={() => HandleEdit(index)}
                                style={{ margin: '4px' }}
                                className="EditButton"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => HandleRemove(index)}
                                style={{ margin: '4px' }}
                                className="RemoveButton"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}