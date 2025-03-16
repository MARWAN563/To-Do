import React from 'react'
import ToDoList from './ToDoList';
export default function App() {
  return (
    <>
    <h1 style={{fontSize:'60px', textAlign:'center', marginBottom:'1px'}}>To-Do List</h1>
    
    <hr style={{width:'40%' , height:'4px', backgroundColor:'yellow' }}/>
    <hr style={{width:'40%' , height:'4px', backgroundColor:'red' }}/>
    <hr style={{width:'40%' , height:'4px', backgroundColor:'green' }}/>
    <hr style={{width:'40%' , height:'4px', backgroundColor:'purple' }}/>


    <hr style={{marginTop:'4%'}}/>

    <div>

      <ToDoList/>
    </div>

    </>
  );
}
