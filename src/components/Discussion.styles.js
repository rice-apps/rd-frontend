import styled from "styled-components";


const DiscussionBoxSection = styled.section` // contains DiscussionBox
    padding: 10px 100px;
    background: papayawhip;
`;

const DiscussionBox = styled.section` // contains LeftComponent, MiddleComponent, BottomComponent
    padding: 5px;
    background: white;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 1fr 40px;
    grid-template-columns: 65px 1fr;
    grid-template-areas:
        "Left Middle"
        "Left Bottom"
`;

const LeftComponent = styled.div` // contains Upvote, Downvote, Likes, Dislikes
    
    display: grid;
    grid-template-rows: 1fr 20px 30px 30px 20px 1fr;
    grid-area: Left;
    justify-items: center;
    align-items: center;
`;

const Likes = styled.div`
    grid-row: 2/3
`;

const Upvote = styled.div`
    grid-row: 3/4
`;

const Downvote = styled.div`
    grid-row: 4/5
`;

const Dislikes = styled.div`
    grid-row: 5/6
`;

const MiddleComponent = styled.div` // contains DiscussionTitle, DiscussionBody
    display: grid;
    justify-items: start;
    grid-area: Middle;
    grid-template-rows: 40px 1fr;
`;

const DiscussionTitle = styled.text`
    padding: 10px 0px;
    font-family: "Avenir";
    font-size: 3vh;
    font-weight: bold;
`;

const DiscussionBody = styled.text`
    padding: 10px 0px;
    font-family: "Avenir";
    font-size: 2vh;
    word-wrap: break-word;
`;

const BottomComponent = styled.div` // contains Save, AddTo, OP, Time, Date, Share
    grid-area: Bottom;
`;


export { DiscussionBoxSection, DiscussionBox, LeftComponent, Likes, Upvote, 
        Downvote, Dislikes, MiddleComponent, DiscussionTitle, DiscussionBody, BottomComponent };