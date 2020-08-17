import React, { useState, useEffect } from 'react'

const DropDownItem = props => {
  const { selectedItems, name } = props

  const [selected, setSelected] = useState(false)
  const [color, setColored] = useState('white')

  useEffect(() => {
    selectedItems.includes(name) ? setSelected(true) : setSelected(false)
  }, [selectedItems, name])

  useEffect(() => {
    setColored(selected ? 'lightblue' : 'white')
  }, [selected])

  const toggleSelected = () => {
    setSelected(!selected)
    props.setInfo(props.name)
  }

  return (
    <div onClick={toggleSelected} style={{ background: color, width: '300px' }}>
      {props.name}
      {selected && '✔'}
    </div>
  )
}

export default DropDownItem
