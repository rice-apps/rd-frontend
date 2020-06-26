import styled from "styled-components";
import { Link } from "react-router-dom";

const GoToPost = styled.div`
    width: 20vh;
    font-family: "Ubuntu";
    font-size: 5vh;
    background-color: black;
    border-radius: 0.2vw;
`;

const PostLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: white;

    &:hover {
        color: cornflowerblue;
        border-radius: 0.5vw;
    }
`;

export { GoToPost, PostLink };
