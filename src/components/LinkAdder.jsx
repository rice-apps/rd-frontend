import React from 'react'

function LinkAdder (props) {
  const submit = e => {
    e.preventDefault()

    const link = document.getElementById('link-address').value.trim()

    if (link) {
      props.callback(link) // make accessible to WritePost
      props.handleDismissSelf()
    }
  }

  return props.show ? (
    <div>
      <label htmlFor='link-address'>
        Enter a url, select some text below, and press Add:{' '}
      </label>
      <input type='text' id='link-address' />
      <button onMouseDown={submit}>Add</button>
      <button onClick={props.handleDismissSelf}>Cancel</button>
    </div>
  ) : null
}

export default LinkAdder
