import React from 'react'
// import moment from 'moment'
// import log from 'loglevel'
// import { useMutation } from '@apollo/client'

// import { S3_SIGN } from '../graphql/Mutations'

function LinkAdder (props) {
  const submit = e => {
    e.preventDefault()

    const link = document.getElementById('link-address').value.trim()
    // Maybe check if it is a valid link here?
    // const text = document.getElementById('assoc-text').value.trim()
    console.log(link)
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
      <input
        type='text'
        // onChange={value => setLink(value)}
        id='link-address'
        // name='imgFile'
        // accept='image/*'
      />
      {/* <label htmlFor='assoc-text'>Enter text: </label> */}
      {/* <input */}
      {/*    type='text' */}
      {/*    // onChange={value => setLink(value)} */}
      {/*    id='assoc-text' */}
      {/*    // name='imgFile' */}
      {/*    // accept='image/*' */}
      {/* /> */}
      <button onMouseDown={submit}>Add</button>
      <button onClick={props.handleDismissSelf}>Cancel</button>
    </div>
  ) : null
}

export default LinkAdder
