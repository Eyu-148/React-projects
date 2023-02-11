import React from "react";
import { Task } from "../models/task";
import Todo from "./todo";

interface Props {
    tasks: Task[];
    editTasks: Function;
    deleteTask: Function;
}

const TodoList : React.FC<Props> = (props:Props) => {

    return (
        <div className="tasks-container">
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
            {
                props.tasks.map((task) => (
                    <Todo 
                      id={task.id} 
                      name={task.name} 
                      completed={task.completed}
                      key={task.id} // You should always pass a unique key to anything you render with iteration
                      editTask = {props.editTasks}
                      deleteTask = {props.deleteTask}
                    />
                  ))
            }
            </ul>
        </div>
    );
}

export default TodoList;