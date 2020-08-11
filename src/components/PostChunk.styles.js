import styled from "styled-components";

const DiscussionBoxSection = styled.section`
    // contains OP, DiscussionBox
    padding: 20px 140px;
    max-width: 50vw;
`;

const OP = styled.div`
`;

const Time = styled.div`
`;

const DiscussionBox = styled.section`
    // contains LeftComponent, TopMiddleComponent, BottomComponent
    padding: 5px;
    background: #ffffff;
    border-radius: 20px;
    display: grid;
    grid-template-rows: 1fr 50px;
    grid-template-columns: 65px 1fr;
    grid-template-areas:
        "left topmiddle"
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

const TopMiddleComponent = styled.div`
    // contains DiscussionTitle, DropDown, DiscussionBody
    grid-area: topmiddle;
    display: grid;
    grid-template-areas:
        "title moreoptions"
        "body moreoptions";
    grid-template-columns: 6fr 1fr;
    grid-template-rows: 50px 1fr;
`;

const DiscussionTitleDiv = styled.div`
    grid-area: title;
    padding: 20px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const DiscussionTitle = styled.text`
    justify-self: start;
    align-self: start;
    font-family: "Avenir";
    font-size: 2.5vh;
    font-weight: bold;
`;

const MoreOptions = styled.div`
    grid-area: moreoptions;
    align-self: start;
    justify-self: end;
`;

const DDMenu = styled.div`
    position: relative;
    align-self: stretch;
    justify-self: stretch;
    background-color: white;
    display: grid;
    bottom: 25px;
    width: 200%;
`;

const Save = styled.button`
    padding: 5px;
`;

const AddTo = styled.button`
    padding: 5px;
`;

const Report = styled.button`
    padding: 5px;
`;

const Delete = styled.button`
    padding: 5px;
`;

const DiscussionBody = styled.text`
    grid-area: body;
    padding: 10px 0px;
    font-family: "Avenir";
    font-size: 2vh;
    word-wrap: break-word;
    max-height: 100px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const BottomComponent = styled.div`
    // contains Tags, ShareFacebook, ShareTwitter, Share
    grid-area: bottom;
    display: grid;
    grid-template-columns: 1fr 40px 40px 40px 15px;
    grid-template-areas: "tags facebook twitter share .";
    justify-items: start;
    align-items: center;
`;

const Tags = styled.div`
    // contains Tag, ViewTags
    grid-area: tags;
    word-wrap: break-word;
`;

const Tag = styled.text`
    font-family: "Avenir";
    font-size: 1.75vh;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: none;
    border-radius: 5px;
    margin-right: 7px;
    padding: 2px 5px;
`;

const ViewTags = styled.button`
    border: none;
    background-color: inherit;
`;

const MoreTags = styled.div`
    word-wrap: break-word;
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
    OP,
    Time,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    TopMiddleComponent,
    DiscussionTitleDiv,
    DiscussionTitle,
    Tags,
    Tag,
    ViewTags,
    MoreTags,
    MoreOptions,
    DDMenu,
    DiscussionBody,
    BottomComponent,
    Save,
    AddTo,
    Report,
    Delete,
    ShareFacebook,
    ShareTwitter,
    Share,
};
