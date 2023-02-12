import React, {useState} from 'react';
import './App.css';
import { Task } from './models/task';
import TodoList from './components/todoList';
import InputField from './components/InputField';
import FilterButton from './components/FilterButton';
import {nanoid} from 'nanoid';

// initial testing data
const TODO_DATA:Task[] = [
  {id: "todo-0", name: "Eat", completed: true},
  {id: "todo-1", name: "Sleep", completed: false},
  {id: "todo-2", name: "Repeat", completed: false}
];

// create a object for filter map
const FilterMap = {
  All: () => true,
  Active: (task:Task) => !task.completed,
  Compeleted: (task:Task) => task.completed
};
const FILTER_NAMES:string[] = Object.keys(FilterMap); // using Object.keys() to collect an array of filter options' names


// render App
const App:React.FC = () => {
  // manipulation of tasks and heading text
  const [tasks, setTasks] = useState<Array<Task>>(TODO_DATA);
  const taskNoun:string = tasks.length === 1 ? 'task' : 'tasks';
  const heading:string = `${tasks.length} ${taskNoun} Remaining`;
 

  // manipulation of filters
  const [filter, setFilter] = useState<string>('All');
  const filterList = FILTER_NAMES.map((name)=>(
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));


  // function addTask(), called in InputField component
  function addTask(name:string) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
    alert('Task Added Sucessfully!')
  }


  // function editTask()/deleteTask()/toggleTaskCompleted(), called in todo component
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

  function toggleTaskCompleted(id:string) {
    const updatedTasks:Task[] = tasks.map((task)=>{
      if (task.id === id) {
        return {...task, completed:!task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  return (
    <div className="App">
      <span className='heading'>{heading}</span>
      <InputField addTask = {addTask}/>
      <div className='filter-container'>{filterList}</div>
      <TodoList tasks={tasks.filter(FilterMap[filter as keyof typeof FilterMap])} editTasks={editTask} deleteTask={deleteTask} toggleTaskCompleted={toggleTaskCompleted}/>
    </div>
  );
}

export default App;
