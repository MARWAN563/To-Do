import React, { useRef, useState } from 'react'

export default function ToDoList() {
    const [items, setItem] =  useState(['nothing holding me back'])
    const inputRef = useRef()
    const [isEditing, setIsEditing] = useState(false);
    
    const GetValue = () => {
        const inputValue = inputRef.current.value;
        if(inputValue === '') return;
        setItem([...items, inputValue]);
        inputRef.current.value = ''
    
    }


    function HandleRemove(index){
        const remover = items.filter((item , i) => i !== index );
        setItem(remover)
}

const HandleEdit = (index) => {
    setIsEditing(true);
    const newValue = prompt('Enter New Value');
    const edit = items.map((item , i) => i === index ? newValue : item);
    setItem(edit)
}

const Save Edit = () => {
return (
    <div id='containerOfProject'>
        <input type="text" ref={inputRef} placeholder='Write Your Mission...' />
        
        
        {isEditing ? (
                    <button onClick={HandleEdit} style={{ padding: '8px', marginLeft: '10px' }}>
                        Save
                    </button>
                ) : (
                    <button onClick={GetValue} style={{ padding: '8px', marginLeft: '10px' }}>
                        Add
                    </button>
                )}
        
        
        
        <div id='Content'>
            {items.map( (item , index) => (

                <div key={index} style={{display:'flex'}}>

                  <h2> {index}.  </h2> 
                   <h2> {item} </h2>
                <div>
                   <button onClick={ () => HandleEdit(index)}>Edit</button>



                   <button onClick={ () => HandleRemove(index)}  >Remove</button>
                </div>
                </div>




            )  )}



        </div>


    </div>
  )
}
