import React, { useState } from 'react'
import moment from 'moment'
import log from 'loglevel'
import { useMutation } from '@apollo/client'

import { S3_SIGN } from '../graphql/Mutations'

function UploadToPost (props) {
  const [file, setFile] = useState(null)
  const [s3Sign] = useMutation(S3_SIGN)

  const sendData = url => props.parentUrlCallback(url)

  const onDrop = event => {
    const fileList = event.target.files
    setFile(fileList[0]) // chooses first file, would need to modify (and check aws) to drop multiple at once
  }

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        'Content-Type': file.type
      },
      mode: 'cors', // update access
      method: 'PUT',
      body: file
    }

    log.info(file.type)

    await window.fetch(signedRequest, options)
  }

  const formatFilename = filename => {
    const date = moment().format('YYYYMMDD')
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7)
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`
    return newFilename.substring(0, 60)
  }

  const submit = async e => {
    e.preventDefault()
    const response = await s3Sign({
      variables: {
        filename: formatFilename(file.name),
        filetype: file.type
      }
    })

    const { signedRequest, url } = response.data.signS3Url

    uploadToS3(file, signedRequest)
    sendData(url) // make accessible to WritePost
    props.handleDismissSelf()
  }

  const handleCancel = () => {
    sendData('')
    props.handleDismissSelf()
  }

  return props.show ? (
    <div>
      <label htmlFor='img'>Choose an image: </label>
      <input
        type='file'
        onChange={onDrop}
        id='img'
        name='imgFile'
        accept='image/*'
      />
      <button onClick={e => submit(e)}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  ) : null
}

export default UploadToPost
