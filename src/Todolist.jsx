import React, { useState } from 'react'
function Todolist()
{
    const [tasks, setTasks] = useState([]);
    const [newTask,setNewTask]= useState("");
    const [quantity,setNewQuantity]=useState(1);
    const [filter, setFilter]=useState('All');
    const [doneTasks, setDoneTasks]=useState([]);
    const [notDoneTasks, setNotDoneTasks]=useState([]);


    function handleInputChange (event)
    {
        setNewTask(event.target.value);
    }

    function handleQuantityChange(event)
    {
        setNewQuantity(event.target.value);
    }

    function addTask()
    {
        if(newTask.trim() !=="")
        {
        setTasks(t=>[...t,{text:newTask.trim(), quantity:quantity, checked:false }]);
        setNewTask("");
        setNewQuantity(1);
        }
    } 
     function deleteTask(index)
     {
       const updatedTasks = tasks.filter((_,i)=> i!==index);
       setTasks(updatedTasks);
     }

     function moveTaskUp(index){
        if (index>0)
        {
            const updatedTasks=[...tasks];
            [updatedTasks[index], updatedTasks[index -1] ]=[updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

     }

     function moveTaskDown(index){
        if (index<tasks.length-1)
        {
            const updatedTasks=[...tasks];
            [updatedTasks[index], updatedTasks[index +1] ]
            =[updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
     }

     function toggleTaskChecked(index) {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, checked: !task.checked} : task
        );
        setTasks(updatedTasks);
        setDoneTasks (updatedTasks.filter((task) => task.checked));
        setNotDoneTasks (updatedTasks.filter((task) => !task.checked));
    }

    function handleFilterCheck (e)
    {
        filterCheck(e.target.value) ;
    }

    function filterCheck(value)
    {
        setFilter(value);
    }
    return (
        <div className='todolist'>
            <h1>My To-Do List</h1>
            <div>
                <input type="text" placeholder="Enter your task here..." value={newTask} onChange={handleInputChange} />
                <input type="number" placeholder="Quantity" value={quantity} min="1" onChange={handleQuantityChange} />
                <button className='addbutton' onClick={addTask}>
                    Add
                </button>
                <div>
                <select value={filter} onChange={handleFilterCheck}>
                  <option value='All'>All</option>
                  <option value='Done'>Done</option>
                  <option value='NotDone'>Not Done </option>
                </select>
                </div>
                {tasks.length===0? (<p className='taskno'> You have no tasks.</p>):<p className='taskno'>You have {tasks.length} items on your list.</p>}
                
                <ol>
    {filter === 'All' && tasks.map((task, index) => (
        <li key={index}>
            <input type="checkbox" checked={task.checked} onChange={() => toggleTaskChecked(index)} />
            <span className='text' style={{ marginRight: "10px", textDecoration: task.checked ? "line-through" : "none" }}>{task.text}</span>
            <span className='quantity'>{task.quantity}</span>
            <button className='deletebutton' onClick={() => deleteTask(index)}>
                Delete
            </button>
            <button className='movebutton' onClick={() => moveTaskUp(index)}>
                👆
            </button>
            <button className='movebutton' onClick={() => moveTaskDown(index)}>
                👇
            </button>
        </li>
    ))}
    {filter === 'Done' && doneTasks.map((task, index) => (
        <li key={index}>
            <input type="checkbox" checked={task.checked} onChange={() => toggleTaskChecked(index)} />
            <span className='text' style={{ marginRight: "10px", textDecoration: "line-through" }}>{task.text}</span>
            <span className='quantity'>{task.quantity}</span>
            <button className='deletebutton' onClick={() => deleteTask(index)}>
                Delete
            </button>
            <button className='movebutton' onClick={() => moveTaskUp(index)}>
                👆
            </button>
            <button className='movebutton' onClick={() => moveTaskDown(index)}>
                👇
            </button>
        </li>
    ))}
    {filter === 'NotDone' && notDoneTasks.map((task, index) => (
        <li key={index}>
            <input type="checkbox" checked={task.checked} onChange={() => toggleTaskChecked(index)} />
            <span className='text'>{task.text}</span>
            <span className='quantity'>{task.quantity}</span>
            <button className='deletebutton' onClick={() => deleteTask(index)}>
                Delete
            </button>
            <button className='movebutton' onClick={() => moveTaskUp(index)}>
                👆
            </button>
            <button className='movebutton' onClick={() => moveTaskDown(index)}>
                👇
            </button>
        </li>
    ))}
</ol>

                </div> 
        </div>
    );

}
export default Todolist