import React, {useState} from "react";

export default function Form(props) {

    /**
     * We are setting the initial name value as "Use hooks!".
     * We are defining a function whose job is to modify name, called setName()
     */
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName(""); // empty inputs after submission  
        alert("New Task Added Successfully!");
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
                What needs to be done?
            </label>
            </h2>
            <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}