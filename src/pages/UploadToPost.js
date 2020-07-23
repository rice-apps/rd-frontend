import React, { useState } from "react";
import Dropzone from "react-dropzone";
import moment from "moment";
// import { graphql } from "react-apollo"; //deprecated??
import { graphql } from '@apollo/react-hoc'
// import gql from "graphql-tag.macro"; //??
import {flowRight as compose} from 'lodash';
import { useHistory } from "react-router-dom";
import {gql, useMutation} from '@apollo/client'

import {s3SignMutation, CreateDisplayMutation} from '../graphql/Mutations'

function UploadToPost(props) {
    const history = useHistory();

    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const [s3Sign, { data: s3Data }] = useMutation(s3SignMutation);
    const [createDisplay, { data: displayData }] = useMutation(CreateDisplayMutation);
    // first one to execute
    // second one (data) to __
    // also available: loading and error states

    // const onDrop = async files => {
    //     setFile(files[0]); // chooses first file, would need to modify (and check aws) to drop multiple at once
    // };

    const onDrop2 = event => {
        console.log("DROP event logging");
        console.log(event);
        console.log(event.target);

        const etf = event.target.files;
        console.log(etf);
        setFile(etf[0]); // chooses first file, would need to modify (and check aws) to drop multiple at once
    };
    
    const onChange = e => {
        //CHECK
        // this.setState({
        //     [e.target.name]: e.target.value
        // });

        console.log(e.target.name);
        console.log(e.target.value);
        setName(e.target.value); //no longer a dynamic key name? not sure what the purpose was
    };

    const uploadToS3 = async (file, signedRequest) => {
        const options = {
            headers: {
                "Content-Type": file.type
            }
        };
        //CHECK
        // fetch or bent or axios
        //await axios.put(signedRequest, file, options); // is signedRequest the url??
        await fetch(signedRequest, {
            method: 'PUT',
            options, 
            body: file
        });
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
    
    const submit = async () => {
        const response = await s3Sign({
            variables: {
                filename: formatFilename(file.name),
                filetype: file.type
            }
        });
    
        const { signedRequest, url } = response.data.signS3; 
        await uploadToS3(file, signedRequest);

        return url; // to parent
    
        // const graphqlResponse = await createDisplay({
        //     variables: {
        //         name,
        //         pictureUrl: url
        //     }
        // });
    
        // history.push(
        //   `/theimage/${graphqlResponse.data.createDisplay.id}` //changes routes with new data
        // );

        //dont display straight away? use hook
        //provide url to post when being displayed

        //custom hook
        //to do the image uploading
        //indicate to parent that i have something for you to take from me (the url to access the picture)
        //parent needs it, child produces it

        //define mutations from upload to post in write post
        //call the mutations that come from props in upload
        //
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
            <p>The Image Upload Section</p>
            <input name="name" onChange={onChange} value={name} />
            <input type="file" onChange={onDrop2} value={file} />
            <button onClick={submit}>Submit</button>
        </div>
    )
}

// use mutation

//upload button



// const CreateDisplayMutation = gql`
//     mutation($name: String!, $pictureUrl: String!) {
//         createDisplay(name: $name, pictureUrl: $pictureUrl) {
//             id
//         }
//     }
// `;

// const s3SignMutation = gql`
//     mutation($filename: String!, $filetype: String!) {
//         signS3(filename: $filename, filetype: $filetype) {
//             url
//             signedRequest
//         }
//     }
// `;

export default compose(
    graphql(CreateDisplayMutation, { name: "createDisplay" }),
    graphql(s3SignMutation, { name: "s3Sign" })
)(UploadToPost);
