import React, { useState } from "react";
import Dropzone from "react-dropzone";
import moment from "moment";
import { useMutation } from '@apollo/client'

import {S3_SIGN } from '../graphql/Mutations'

function UploadToPost(props) {
    // const history = useHistory();

    const [file, setFile] = useState(null);
    // const [url, setUrl] = useState("");

    const sendData = (url) => props.parentUrlCallback(url);

    const [ s3Sign ] = useMutation(S3_SIGN);
    // first one to execute
    // second one (data) to __
    // also available: loading and error states

    // const onDrop = async files => {
    //     setFile(files[0]); // chooses first file, would need to modify (and check aws) to drop multiple at once
    // };

    const onDrop2 = event => {
        const fileList = event.target.files;
        // console.log(fileList[0]); //the file itself
        setFile(fileList[0]); // chooses first file, would need to modify (and check aws) to drop multiple at once
    };

    const uploadToS3 = async (file, signedRequest) => {
        const options = {
            headers: {
                "Content-Type": file.type
            },
            mode: "cors", //update access
            method: 'PUT',
            body: file
        };

        await fetch(signedRequest, options);
    };

    const formatFilename = filename => {
        const date = moment().format("YYYYMMDD");
        const randomString = Math.random()
            .toString(36)
            .substring(2, 7);
        const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
        return newFilename.substring(0, 60);
    };
    
    const submit = async (e) => {
        e.preventDefault()
        const response = await s3Sign({
            variables: {
                filename: formatFilename(file.name),
                filetype: file.type
            }
        });

        console.log(response); //works, "pending promise"
        console.log(response.data);
        // console.log(s3Data);
    
        const { signedRequest, url } = response.data.signS3Url; 
        console.log(signedRequest);
        console.log(url);
        uploadToS3(file, signedRequest);

        sendData(url);
    };

    return (
        // <div>
        //     <p>The Image Upload Section</p>
        //     <input name="name" onChange={onChange} value={name} />
        //     <Dropzone onDrop={onDrop}>
        //         <p>
        //             Try dropping some files here, or click to select files to upload.
        //         </p>
        //     </Dropzone>
        //     {/* <input type="file" onChange={onDrop} value={name} /> */}
        //     <button onClick={submit}>Submit</button>
        // </div>
        <div>
            {/* <p>The Image Upload Section</p> */}
            {/* <input type="file" onChange={onDrop2} value={file} /> */}
            <label for="img">Choose an image: </label>
            <input type="file"
                onChange={onDrop2}
                id="img" name="imgFile"
                accept="image/*"></input>
            <button onClick={e => submit(e)}>Submit</button>
        </div>
    )
}

// use mutation

//upload button


// export default compose(
//     graphql(DisplayImageMutation, { name: "createDisplay" }),
//     graphql(s3SignMutation, { name: "s3Sign" })
// )(UploadToPost);

export default UploadToPost;
