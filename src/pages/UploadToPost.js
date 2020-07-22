import React, { useState } from "react";
import Dropzone from "react-dropzone";
import moment from "moment";
import { graphql } from "react-apollo";
import gql from "graphql-tag.macro"; //??
import {flowRight as compose} from 'lodash';
import { useHistory } from "react-router-dom";

function UploadToPost(props) {
    const history = useHistory();

    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

    const onDrop = async files => {
        setFile(files[0]); // chooses first file, would need to modify (and check aws) to drop multiple at once
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
        const response = await props.s3Sign({
            variables: {
                filename: formatFilename(file.name),
                filetype: file.type
            }
        });
    
        const { signedRequest, url } = response.data.signS3; 
        await uploadToS3(file, signedRequest);
    
        const graphqlResponse = await props.createChampion({
            variables: {
                name,
                pictureUrl: url
            }
        });
    
        history.push(
          `/champion/${graphqlResponse.data.createChampion.id}` //changes routes with new data
        );
    };

    return (
        <div>
            <p>The Image Upload Section</p>
            <input name="name" onChange={onChange} value={name} />
            <Dropzone onDrop={onDrop}>
                <p>
                    Try dropping some files here, or click to select files to upload.
                </p>
            </Dropzone>
            <button onClick={submit}>Submit</button>
        </div>
    )
}

const CreateChampionMutation = gql`
    mutation($name: String!, $pictureUrl: String!) {
        createChampion(name: $name, pictureUrl: $pictureUrl) {
        id
        }
    }
`;

const s3SignMutation = gql`
    mutation($filename: String!, $filetype: String!) {
        signS3(filename: $filename, filetype: $filetype) {
        url
        signedRequest
        }
    }
`;

export default compose(
    graphql(CreateChampionMutation, { name: "createChampion" }),
    graphql(s3SignMutation, { name: "s3Sign" })
)(UploadToPost);
