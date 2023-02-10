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
  
  return (
    <div className="App">
      <span className='heading'>Tasks</span>
      <InputField addTask = {addTask}/>
      <TodoList tasks = {tasks}/>
    </div>
  );
}

export default App;
