
import './App.css';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }

  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' +m+ ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  }
  useEffect(()=>{
    let savedTodo =  JSON.parse(localStorage.getItem('todolist'))
    let  savedCompletedTodo =  JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[]);
  return (
    <div className="App">
      <h1>TASKWORLD</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Tittle</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Whats the task tittle?' />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Whats the task description?' />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div>
          <div className='btn-area'>
            <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
              onClick={() => setIsCompleteScreen(false)}>Todo</button>
            <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
              onClick={() => setIsCompleteScreen(true)}>Complete</button>
          </div>

          <div className='todo-list'>

            {isCompleteScreen===false && allTodos.map((items,index) => {
              return(
                <div className='todo-list-item' key={index}>
              <div>
                <h3>{items.title}</h3>
                <p>{items.description}</p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete?' />
                <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Complete?' />
              </div>
            </div>
              );
            })}
            {isCompleteScreen===true && completedTodos.map((items,index) => {
              return(
                <div className='todo-list-item' key={index}>
              <div>
                <h3>{items.title}</h3>
                <p>{items.description}</p>
                <p><small>Fecha:<br></br>{items.completedOn}</small></p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete?' />
              </div>
            </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
