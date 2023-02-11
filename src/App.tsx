import React, {useState} from 'react';
import './App.css';
import { Task } from './models/task';
import TodoList from './components/todoList';
import InputField from './components/InputField';
import {nanoid} from 'nanoid';


const TODO_DATA:Task[] = [
  {id: "todo-0", name: "Eat", completed: true},
  {id: "todo-1", name: "Sleep", completed: false},
  {id: "todo-2", name: "Repeat", completed: false}
];

const App:React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>(TODO_DATA);

  function addTask(name:string) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
    alert('Task Added Sucessfully!')
  }

  function editTask(id:string, newName:string) {
    const updatedTasks:Task[] = tasks.map((task) => {
        if (id === task.id) {
            return {...task, name:newName};
        }
        return task;
    });
    setTasks(updatedTasks);
}

function deleteTask(id:string) {
  const updatedTasks:Task[] = tasks.filter((task) => id !== task.id);
  setTasks(updatedTasks);
}
  
  return (
    <div className="App">
      <span className='heading'>Tasks</span>
      <InputField addTask = {addTask}/>
      <TodoList tasks = {tasks} editTasks = {editTask} deleteTask = {deleteTask}/>
    </div>
  );
}

export default App;
