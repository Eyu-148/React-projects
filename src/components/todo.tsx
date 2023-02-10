import React from "react";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
    id: string;
    name: string;
    completed: boolean;
    key: string;
    
};

const Todo:React.FC<Props> = (props:Props) => {

    const viewingTemplate = (
        <div className="task-single">
            <div className="todo-input">
            
                <input id={props.id} 
                        type="checkbox" 
                        defaultChecked={props.completed}
                        //onChange={()=>props.toggleTaskCompleted(props.id)} 
                />
                
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>

            <div className="btn-group">
                <span className="icon">
                    <AiFillEdit /> 
                    <span className="visually-hidden">Edit {props.name}</span>
                </span>
                
                <span className="icon">
                    <AiFillDelete />
                    <span className="visually-hidden">Delete {props.name}</span>
                </span>
            </div>
            
      </div>
    );

    return (
        <li className="todo">{viewingTemplate}</li>
    );
};

export default Todo;