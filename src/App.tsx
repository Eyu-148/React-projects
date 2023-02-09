import React from 'react';
import InputField from './components/InputField';
import './App.css';
import { Task } from './models/task';
import TodoList from './components/todoList';


const TODO_DATA:Task[] = [
  {id: "todo-0", name: "Eat", completed: true},
  {id: "todo-1", name: "Sleep", completed: false},
  {id: "todo-2", name: "Repeat", completed: false}
];

const App:React.FC = () => {
  
  return (
    <div className="App">
      <span className='heading'>Tasks</span>
      <InputField />
      <TodoList tasks = {TODO_DATA}/>
    </div>
  );
}

export default App;
