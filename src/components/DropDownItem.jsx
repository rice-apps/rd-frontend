import React, { useState, useEffect } from 'react'

function DropDownItem (props) {
  const { selectedItems, name } = props

  const [selected, setSelected] = useState(false)
  const [color, setColored] = useState('white')

  useEffect(() => {
    selectedItems.includes(name) ? setSelected(true) : setSelected(false)
  }, [selectedItems, name])

  useEffect(() => {
    setColored(selected ? '#54C1FB4D' : 'white')
  }, [selected])

  const toggleSelected = () => {
    setSelected(!selected)
    props.setInfo(props.name)
  }

  return (
    <div onClick={toggleSelected} style={{ background: color, paddingBottom: '0.1em', paddingTop: '0.1em' }}>
      {selected && '✔  '}

      {props.alias ? props.alias : props.name}
    </div>
  )
}

export default DropDownItem
