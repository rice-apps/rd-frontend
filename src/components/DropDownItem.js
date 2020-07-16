import React, { useState, useEffect } from "react";
import "./DropDownItem.styles.css"

const DropDownItem = (props) => {
    const [selected, setSelected] = useState(false);
    const [color, setColored] = useState("white");

    useEffect(() => {
        const data = props.selectedItems;
        data.includes(props.name) ? setSelected(true) : setSelected(false);
        // eslint-disable-next-line
    }, [props.selectedItems]);

    useEffect(() => {
        setColored(selected ? "lightblue" : "white");
    }, [selected])

    const toggleSelected = () => {
        setSelected(!selected);
        props.setInfo(props.name);
    };

    return (
        <div onClick={toggleSelected} style = {{background: color}}>
            {props.name}
            {selected && "✔"}
        </div>
    );
};

export default DropDownItem;
