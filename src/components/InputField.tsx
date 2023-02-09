import React, { FormEvent, useState } from "react";
import './style.css';

interface Props {
    
}

const InputField : React.FC = () => {
    const [name, setName] = useState("");

    function handleSubmit(e:FormEvent) {
        e.preventDefault();

    }

    return (
        <form className="input-field">
            <input type="input" placeholder="Enter a task here~" className="input-box"></input>
            <button className="input-submit" type="submit">Go</button>
        </form>
    );
};

export default InputField;