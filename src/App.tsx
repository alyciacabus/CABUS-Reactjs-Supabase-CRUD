import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabase-client'


// Create, Read, Update, and Deletew

//title and description, type is all 'text'


interface Task {
id: number
created_at: string
title: string
description: string
}

export default function App() {

const tableName = import.meta.env.VITE_TABLE_NAME;   

const [newTask, setNewTask] = useState({title: "", description: ""});
const [showTask, setShowTask] = useState<Task[]>([]);
const [newDesc, setNewDesc] = useState('');
const [newTitle, setNewTitle] = useState('');


//Delete function:
const deleteTask = async (id: number) => {
const { error } = await supabase
.from(tableName)
.delete()
.eq('id', id) // 'column' and 'value to target'

if ( error ) {
console.error("Error fetchtTask data", error.message);
return; // to stop the function here
}

// then the item is deleted

}

//Update fucntion:
const updateTask = async (id: number) => {
const { error } = await supabase
.from(tableName)
.update({title: newTitle, description: newDesc})
.eq('id', id) // 'column' and 'value to target'

if ( error ) {
console.error("Error fetchtTask data", error.message);
return; // to stop the function here
}

// then the item is deleted

}

// Read function:
const fetchTask = async () => {
const {error: fecthError, data} = await supabase
.from(tableName)
.select('*') // all data to be "selected"
.order('created_at', {ascending: false})

if ( fecthError ) {
console.error("Error fetchtTask data", fecthError.message);
return; // to stop the function here
}

setShowTask(data);
}


// Create function:
const insertTask = async (e: any) => {
e.preventDefault();

const { error } = await supabase
//what table name?, what table name to target or use?
//what table or table name?
.from(tableName)
//unsa atong e insert sa table?, what do put inside the table and what to target?
//target: 'column'
.insert(newTask)
.single()

if ( error ) {
console.error("Error insertTask data", error.message);
return; // to stop the function here
}

setNewTask({title: "", description: ""});
}


useEffect(() => {
fetchTask();
})

return (
<>
<h1>Supabase x React js</h1>

<form onSubmit={insertTask}>

<input
type="text"
placeholder='Title Here'
required
// onChange // short-hand function: lambda function
onChange={(e) =>
setNewTask(
(prev) => (
{...prev, title: e.target.value}
)
)
}
/>
<textarea
name=''
id=''
placeholder='Description Here'
required
onChange={(e) =>
setNewTask(
(prev) => (
{...prev, description: e.target.value}
)
)
}
/>

<button>Add Task</button>

</form>

{/* use useState and ReadTask function to display the tasks */}

<ul>
{/* displaying of the data */}
{showTask.map((task, key) => (
<li key={key}>
<div>

<h3>{task.title}</h3>
<p>{task.description}</p>
<textarea
placeholder='Edit title'
onChange={(e: any) => {
setNewTitle(e.target.value)
}}
/>
<textarea
placeholder='Edit description'
onChange={(e: any) => {
setNewDesc(e.target.value)
}}
/>
<button onClick={() => updateTask(task.id)}>Update Task</button>
<button onClick={() => deleteTask(task.id)}>Delete Task</button>

</div>
</li>
))}
</ul>
</>
)
}
