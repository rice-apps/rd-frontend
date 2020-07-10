import styled from "styled-components";

import LoginBackground from "../images/backgroundLogin.svg";

const Banner = styled.div`
    // Image at the top
    padding: 100px 100px;
    background-image: url(${LoginBackground});
    background-size: 50%;
`;

const DiscussionBoxSection = styled.section`
    // contains DiscussionBox
    padding: 20px 350px;
    background: papayawhip;
`;

const DiscussionBox = styled.section`
    // contains LeftComponent, MiddleComponent, TopRightComponent, BottomComponent
    padding: 5px;
    background: white;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 40px 1fr 50px;
    grid-template-columns: 65px 1fr;
    grid-template-areas:
        "left top"
        "left middle"
        "left bottom";
`;

const LeftComponent = styled.div`
    // contains Upvote, Downvote, Likes
    display: grid;
    grid-template-rows: 1fr 30px 40px 30px 1fr;
    grid-area: left;
    justify-items: center;
    align-items: center;
`;

const Upvote = styled.div`
    grid-row: 2/3;
`;

const Likes = styled.div`
    grid-row: 3/4;
`;

const Downvote = styled.div`
    grid-row: 4/5;
`;

const TopComponent = styled.div`
    // contains DiscussionTitle, TagOne, TagTwo, TagThree
    display: grid;
    justify-items: start;
    align-items: center;
    grid-area: top;
    grid-template-columns: 1fr 60px 60px 60px;
`;

const DiscussionTitle = styled.text`
    padding: 10px 0px;
    font-family: "Avenir";
    font-size: 3vh;
    font-weight: bold;
`;

const TagOne = styled.div``;

const TagTwo = styled.div``;

const TagThree = styled.div``;

const MiddleComponent = styled.div`
    // contains DiscussionBody
    display: grid;
    justify-items: start;
    grid-area: middle;
`;

const DiscussionBody = styled.text`
    padding: 10px 0px;
    font-family: "Avenir";
    font-size: 2vh;
    word-wrap: break-word;
`;

const BottomComponent = styled.div`
    // contains Save, AddTo, OP, Time, Date, ShareFacebook, ShareTwitter, Share
    grid-area: bottom;
    display: grid;
    grid-template-columns: 70px 100px 1fr 80px 60px 100px 40px 40px 40px;
    grid-template-areas: "save addto . op time date facebook twitter share";
    justify-items: start;
    align-items: center;
`;

const Save = styled.button`
    grid-area: save;
    background: white;
    color: gray;
    border: 2px solid gray;
    border-radius: 5px;
    font-size: 1em;
    align-items: stretch;
`;

const AddTo = styled.button`
    grid-area: addto;
    background: white;
    color: gray;
    border: 2px solid gray;
    border-radius: 5px;
    font-size: 1em;
    align-items: stretch;
`;

const OP = styled.div`
    grid-area: op;
`;

const Time = styled.div`
    grid-area: time;
`;

const Date = styled.div`
    grid-area: date;
`;

const ShareFacebook = styled.div`
    grid-area: facebook;
`;

const ShareTwitter = styled.div`
    grid-area: twitter;
`;

const Share = styled.div`
    grid-area: share;
`;

export {
    Banner,
    DiscussionBoxSection,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    TopComponent,
    DiscussionTitle,
    TagOne,
    TagTwo,
    TagThree,
    MiddleComponent,
    DiscussionBody,
    BottomComponent,
    Save,
    AddTo,
    OP,
    Time,
    Date,
    ShareFacebook,
    ShareTwitter,
    Share,
};
