import './App.css';
import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/comp-Todo'; // import component
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
// using Object.keys() to collect an array
const FILTER_NAMES = Object.keys(FILTER_MAP);
// defining these constants outside the app() so that they won't be changed everytime
// that app() renders


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  // build iterative array for todo contents
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
                  <Todo 
                    id={task.id} 
                    name={task.name} 
                    completed={task.completed}
                    key={task.id} // You should always pass a unique key to anything you render with iteration
                    toggleTaskCompleted = {toggleTaskCompleted}
                    deleteTask = {deleteTask}
                    editTask = {editTask}
                  /> ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const filterList = FILTER_NAMES.map((name)=>(
    <FilterButton 
      key={name} 
      name={name}
      isPressed = {name === filter}
      setFilter = {setFilter} 
    />
  ));


  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) { 
        // if the id property matches, then create a new object and toggle the completed prop
        return {...tasks, completed: !task.completed}
      }
      return task; // return the original one
    });
    setTasks(updatedTask); // update the state
  }

  function deleteTask(id) {
    alert(`Delete Sucessfully`);
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    alert(`Update Sucessfully`);
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        
        {filterList}
      
      </div>

      <h2 id="list-heading">{headingText}</h2>

      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        
        {taskList}

      </ul>

    </div>
  );
}


export default App;
