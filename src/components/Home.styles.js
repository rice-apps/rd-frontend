import styled from "styled-components";
import { Link } from "react-router-dom";

const PostLink = styled(Link)`
    margin: 5vh 5vw 5vh 5vw;
    width: 80vh;
    height: 20vh;
    text-decoration: none;
    color: black;

    &:hover {
        color: cornflowerblue;
        border-radius: 0.5vw;
    }
`;

export { PostLink };
