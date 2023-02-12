import React, {ChangeEvent, FormEvent, useState} from "react";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import { MdCancel, MdDone } from "react-icons/md";

interface Props {
    id: string;
    name: string;
    completed: boolean;
    key: string;
    editTask: Function;
    deleteTask: Function;
    toggleTaskCompleted: Function;
};

const Todo:React.FC<Props> = (props:Props) => {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    console.log(`${props.name} is ${props.completed}`);

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="task-single">
                <div className="todo-input">
                    <label className="todo-label" htmlFor={props.id}>
                        New name for {props.name}
                    </label>
                    <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleNewName}/>
                </div>

                <div className="btn-group">
                    <span className="icon" onClick={()=>setEditing(false)}>
                        <MdCancel /> 
                        <span className="visually-hidden">Cancel renaming {props.name}</span>
                    </span>
                    <button type="submit" className="icon">
                        <MdDone />
                        <span className="visually-hidden">Save new name for {props.name}</span>
                    </button>
                </div>
            </div>
        </form>
    );

    const viewingTemplate = (
        <div className="task-single">
            <div className="todo-input">
            
                <input id={props.id} 
                        type="checkbox" 
                        defaultChecked={props.completed}
                        onChange={()=>{props.toggleTaskCompleted(props.id); 
                                       console.log(`${props.name} is completed:${props.completed}`);}} 
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>

            <div className="btn-group">
                <span className="icon" onClick={()=>setEditing(true)}>
                    <AiFillEdit /> 
                    <span className="visually-hidden">Edit {props.name}</span>
                </span>
                
                <span className="icon" onClick={()=>props.deleteTask(props.id)}>
                    <AiFillDelete />
                    <span className="visually-hidden">Delete {props.name}</span>
                </span>
            </div>
            
      </div>
    );

    function handleNewName(e:ChangeEvent<HTMLInputElement>) {
        if (e.target.value) {
            setNewName(e.target.value);
        } else {
            setNewName(props.name);
        }

    }

    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    return (
        <li className="todo">{isEditing ? editingTemplate:viewingTemplate}</li>
    );
};

export default Todo;