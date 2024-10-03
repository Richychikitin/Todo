
// import './App.css';
// import { useEffect, useState } from 'react';
// import { AiOutlineDelete } from 'react-icons/ai'
// import { BsCheckLg } from 'react-icons/bs';

// function App() {
//   const [isCompleteScreen, setIsCompleteScreen] = useState(false);
//   const [allTodos, setTodos] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [completedTodos,setCompletedTodos] = useState([]);

//   const handleAddTodo = () => {
//     let newTodoItem = {
//       title: newTitle,
//       description: newDescription
//     }

//     let updatedTodoArr = [...allTodos];
//     updatedTodoArr.push(newTodoItem);
//     setTodos(updatedTodoArr);
//     localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
//   };

//   const handleDeleteTodo = (index) =>{
//     let reducedTodo = [...allTodos];
//     reducedTodo.splice(index);

//     localStorage.setItem('todolist',JSON.stringify(reducedTodo));
//     setTodos(reducedTodo)
//   }

//   const handleComplete = (index)=>{
//     let now = new Date();
//     let dd = now.getDate();
//     let mm = now.getMonth() + 1;
//     let yyyy = now.getFullYear();
//     let h = now.getHours();
//     let m = now.getMinutes();
//     let s = now.getSeconds();
//     let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' +m+ ':' + s;

//     let filteredItem = {
//       ...allTodos[index],
//       completedOn:completedOn
//     }

//     let updatedCompletedArr = [...completedTodos];
//     updatedCompletedArr.push(filteredItem);
//     setCompletedTodos(updatedCompletedArr);
//     handleDeleteTodo(index);
//     localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
//   }
//   useEffect(()=>{
//     let savedTodo =  JSON.parse(localStorage.getItem('todolist'))
//     let  savedCompletedTodo =  JSON.parse(localStorage.getItem('completedTodos'))
//     if(savedTodo){
//       setTodos(savedTodo);
//     }

//     if(savedCompletedTodo){
//       setCompletedTodos(savedCompletedTodo);
//     }
//   },[]);
//   return (
//     <div className="App">
//       <h1>TASKWORLD</h1>
//       <div className='todo-wrapper'>
//         <div className='todo-input'>
//           <div className='todo-input-item'>
//             <label>Tittle</label>
//             <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Whats the task tittle?' />
//           </div>
//           <div className='todo-input-item'>
//             <label>Description</label>
//             <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Whats the task description?' />
//           </div>
//           <div className='todo-input-item'>
//             <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
//           </div>
//         </div>
//         <div>
//           <div className='btn-area'>
//             <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
//               onClick={() => setIsCompleteScreen(false)}>Todo</button>
//             <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
//               onClick={() => setIsCompleteScreen(true)}>Complete</button>
//           </div>

//           <div className='todo-list'>

//             {isCompleteScreen===false && allTodos.map((items,index) => {
//               return(
//                 <div className='todo-list-item' key={index}>
//               <div>
//                 <h3>{items.title}</h3>
//                 <p>{items.description}</p>
//               </div>
//               <div>
//                 <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete?' />
//                 <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Complete?' />
//               </div>
//             </div>
//               );
//             })}
//             {isCompleteScreen===true && completedTodos.map((items,index) => {
//               return(
//                 <div className='todo-list-item' key={index}>
//               <div>
//                 <h3>{items.title}</h3>
//                 <p>{items.description}</p>
//                 <p><small>Fecha:<br></br>{items.completedOn}</small></p>
//               </div>
//               <div>
//                 <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete?' />
//               </div>
//             </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  // URL de la API desde las variables de entorno
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Definir fetchTodos con useCallback para memorizarla
  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
      setCompletedTodos(response.data.filter(todo => todo.completedOn));
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // Incluir fetchTodos en el arreglo de dependencias

  const handleAddTodo = async () => {
    if (!newTitle || !newDescription) {
      alert('Por favor, completa ambos campos');
      return;
    }
    try {
      const newTodo = {
        title: newTitle,
        description: newDescription,
      };
      const response = await axios.post(`${API_URL}/todos`, newTodo);
      setTodos([...allTodos, response.data]);
      setNewTitle('');
      setNewDescription('');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(allTodos.filter(todo => todo._id !== id));
      setCompletedTodos(completedTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}/complete`);
      fetchTodos();
    } catch (error) {
      console.error('Error al completar la tarea:', error);
    }
  };

  // Función para importar tareas desde localStorage a MongoDB
  const importTodos = async () => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo && savedTodo.length > 0) {
      try {
        await axios.post(`${API_URL}/todos/import`, { todos: savedTodo });
        alert('Tareas importadas exitosamente a la base de datos.');
        localStorage.removeItem('todolist'); // Opcional: eliminar las tareas de localStorage
        fetchTodos(); // Refrescar las tareas desde el backend
      } catch (error) {
        console.error('Error al importar las tareas:', error);
        alert('Hubo un error al importar las tareas.');
      }
    } else {
      alert('No hay tareas para importar.');
    }
  };

  return (
    <div className="App">
      <h1>TASKWORLD</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Título</label>
            <input
              type='text'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder='¿Cuál es el título de la tarea?'
            />
          </div>
          <div className='todo-input-item'>
            <label>Descripción</label>
            <input
              type='text'
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder='¿Cuál es la descripción de la tarea?'
            />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Agregar</button>
            {/* Botón para importar tareas */}
            <button type='button' onClick={importTodos} className='secondaryBtn'>Importar Tareas</button>
          </div>
        </div>
        <div>
          <div className='btn-area'>
            <button className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
              onClick={() => setIsCompleteScreen(false)}>Pendientes</button>
            <button className={`secondaryBtn ${isCompleteScreen && 'active'}`}
              onClick={() => setIsCompleteScreen(true)}>Completadas</button>
          </div>

          <div className='todo-list'>

            {isCompleteScreen === false && allTodos.filter(todo => !todo.completedOn).map((item) => (
              <div className='todo-list-item' key={item._id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(item._id)} title='Eliminar?' />
                  <BsCheckLg className='check-icon' onClick={() => handleComplete(item._id)} title='Completar?' />
                </div>
              </div>
            ))}

            {isCompleteScreen === true && completedTodos.map((item) => (
              <div className='todo-list-item' key={item._id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completado el: {new Date(item.completedOn).toLocaleString()}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(item._id)} title='Eliminar?' />
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
