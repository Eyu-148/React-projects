import React from "react";
import { Task } from "../models/task";
import Todo from "./todo";

interface Props {
    tasks: Task[];
}

const TodoList : React.FC<Props> = (props:Props) => {
    return (
        <div className="tasks-container">
            {
                props.tasks.map((task) => (
                    <Todo 
                      id={task.id} 
                      name={task.name} 
                      completed={task.completed}
                      key={task.id} // You should always pass a unique key to anything you render with iteration
                    />
                  ))
            }
        </div>
    );
}

export default TodoList;