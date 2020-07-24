import styled from "styled-components";

const TitleFlex = styled.div`
    display: flex;
    width: inherit;
    justify-content: space-between;
`;

const ExitButton = styled.div`
    align-self: end;
    cursor: pointer;
    &:hover {
        background-color: red;
    }
`;

const PostWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 80%;
    height: 80%;
    border-style: solid;
    border-color: green;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    background-color: lightpink; /* Green */
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    z-index: 5;
    margin: 5px;
    cursor: pointer;

    &:hover {
        background-color: #de4783;
        opacity: 50%;
    }
`;

const PostingButton = styled.button`
    position: relative;
    background-color: #fabed6; /* Light pink */
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    z-index: 5;
    margin: 5px;

    &:hover {
        background-color: #de4783;
        opacity: 50%;
    }
`;

const Form = styled.form`
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 95%;
    height: 90%;
    top: -5%;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, 0%);
`;

const PostHeaderType = styled.p`
    position: relative;
    top: -20px;
    text-align: center;
    text-color: blue;
    font-size: 2em;
    background-color: #fabed6;
    width: 100%;

    font-family: Impact, Charcoal, sans-serif;
    font-size: 25px;
    letter-spacing: 2px;
    word-spacing: 2px;
    color: #000000;
    font-weight: 700;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: uppercase;
`;

const TitleDescriptor = styled.p`
    font-family: "Courier New", Courier, monospace;
    font-size: 22px;
    letter-spacing: 1px;
    word-spacing: 0px;
    color: #000000;
    font-weight: 700;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    height: 4%;
    background-color: white;
`;

const TitleWrapper = styled.div`
    position: relative;
    top: -30px;
`;

const TitleBox = styled.div`
    border: solid;
    position: relative;
    height: 5vh;
    flex: 0 0 100%;
`;

const BodyBox = styled.div`
    border: solid;
    position: relative;
    height: 10vh;
`;

const BodyWrapper = styled.div`
    position: relative;
    top: -60px;
`;

const ImageWrapper = styled.div`
    position: relative;
    top: -90px;
`;

const ImageBox = styled.div`
    border: solid;
    position: relative;
    height: 10vh;
    padding: 10px;
`;

export {
    PostWrapper,
    Button,
    ButtonWrapper,
    PostHeaderType,
    Form,
    TitleDescriptor,
    TitleWrapper,
    TitleBox,
    BodyWrapper,
    PostingButton,
    BodyBox,
    ImageWrapper,
    ImageBox,
    ExitButton,
    TitleFlex
};
