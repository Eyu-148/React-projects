import React from "react";

interface Props {
    key: string;
    name:string;
    isPressed: boolean;
    setFilter: Function;
};

const FilterButton:React.FC<Props> = (props:Props) => {
    //console.log(`${props.name} is pressed: ${props.isPressed}`);
    return (
        <button type="button"
                className="btn-filter"
                aria-pressed={props.isPressed}
                onClick={()=>props.setFilter(props.name)}>
            
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;