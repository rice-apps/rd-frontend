import React, { useState, useEffect } from 'react';

const DropDownItem = (props) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const data = props.selectedItems;
        if (data.includes(props.name)){
            setSelected(true);
        }
        else{
            setSelected(false);
        }
    }, [props.selectedItems])

    const toggleSelected = () => {
        setSelected(!selected);
        props.setInfo(props.name)
    }

    return (
        <div onClick = {toggleSelected}>
            {props.name}
            {selected && '✔'}
        </div>
    );
}

export default DropDownItem;