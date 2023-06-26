import React from 'react';
import './Todo.css';
import { useState , useRef , useEffect} from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

 
function Todo()  {
    const[todo , setTodo] = useState('');
    const[todos , setTodos] = useState([]);
    const [editId , setEditID] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const addTodo = () => {
        if(todo !== '') {
            setTodos([...todos,{list : todo, id : Date.now(), status : false}]);
            setTodo('');
        }
        if(editId) {
            const editTodo = todos.find((todo) => todo.id === editId)
            const updateTodo = todos.map((to) => to.id === editTodo.id
            ? (to = {id : to.id , list : todo})
            : (to = {id : to.id , list : to.list}))
            setTodos(updateTodo)
            setEditID(0);
            setTodo('');
        }
    }

    const inputRef = useRef('null');

    useEffect(() => {
        inputRef.current.focus();
    })

    const onComplete = (id) => {
        let complete = todos.map((list) => {
            if(list.id === id){
                return ({...list, status : !list.ststus })
            }
            return list;
        })
        setTodos(complete);
    }
    const onEdit = (id) => {
      const editTodo = todos.find((to) => to.id === id );
      setTodo(editTodo.list);
      setEditID(editTodo.id)
    };

    const onDelete = (id) => {
        setTodos(todos.filter((to) => to.id !== id));
    };
   
    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form className='form-group' onSubmit={handleSubmit}>
                <input type='text' value={todo} ref={inputRef} placeholder='Enter your Todo' onChange={(event)=>setTodo(event.target.value)}/>
                <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'} </button>
            </form>
            <div className='list'>
                <ul >
                    {
                        todos.map((to)=>{
                            return <li key={to} className='list-items'>
                               <div className='list-item-list' id={to.status ? 'list-item' : '' }>{to.list}</div> 
                                <span>
                                    <IoMdCheckmark className='list-item-icons' id='complete' title='Complete' onClick={ () => onComplete(to.id)}/>
                                    <AiFillEdit className='list-item-icons' id='edit' title='Edit' onClick={() => onEdit(to.id) }/>
                                    <AiFillDelete className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(to.id)}/>
                                </span>
                                </li>;
                        })
                    }
                </ul>
            </div>
            </div>
    );
};

export default Todo