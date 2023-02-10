import React, { ChangeEvent, FormEvent, useState, useRef } from "react";
import './style.css';

interface Props {
    addTask: Function;
}

const InputField : React.FC<Props> = (props:Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>("");

    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        props.addTask(name);
        setName("");
        
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    return (
        <form className="input-field" onSubmit={(e)=>{handleSubmit(e); inputRef.current?.blur();}}>
            <input type="input" placeholder="Enter a task here~" ref={inputRef}
                   className="input-box" value={name} onChange={handleChange}></input>
            <button className="input-submit" type="submit">Go</button>
        </form>
    );
};

export default InputField;