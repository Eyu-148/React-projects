import React from "react";

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
            
                <button type="button" className="btn">
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                
                <button type="button" className="btn-danger">
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            
            </div>
      </div>
    );

    return (
        <li className="todo">{viewingTemplate}</li>
    );
};

export default Todo;