import styled from "styled-components";

const DiscussionBoxSection = styled.section`
    // contains DiscussionBox
    padding: 20px 350px;
`;

const DiscussionBox = styled.section`
    // contains LeftComponent, MiddleComponent, TopRightComponent, BottomComponent
    padding: 5px;
    background: #ffffff;
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
    // contains DiscussionTitle, Tags, DropDown
    display: grid;
    grid-area: top;
    grid-template-columns: 4fr 2fr 1fr;
    overflow: hidden;
`;

const DiscussionTitle = styled.text`
    padding: 10px 0px;
    justify-self: start;
    align-self: start;
    font-family: "Avenir";
    font-size: 3vh;
    font-weight: bold;
`;

const Tags = styled.text`
    padding: 10px 0px;
    justify-self: end;
    font-family: "Avenir";
    font-size: 2vh;
    word-wrap: break-word;
`;

const MoreOptions = styled.div`
`;

const MiddleComponent = styled.div`
    // contains DiscussionBody
    display: grid;
    justify-items: start;
    grid-area: middle;
    overflow: hidden;
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
    grid-template-columns: 1fr 80px 60px 100px 40px 40px 40px;
    grid-template-areas: ". op time date facebook twitter share";
    justify-items: start;
    align-items: center;
`;

const Save = styled.button`

`;

const AddTo = styled.button`

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
    DiscussionBoxSection,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    TopComponent,
    DiscussionTitle,
    Tags,
    MoreOptions,
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
