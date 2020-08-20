import styled from "styled-components";
import { Link } from "react-router-dom";

// note: PostFull.styles.js is based on this file 
// so please make relevant design updates to both places

const DiscussionBoxSection = styled.section`
  // contains DiscussionBox
  padding: 20px 140px;
  max-width: 50vw;
`

const OP = styled.div`
  padding: 0px 0px 5px 5px;
`

const Time = styled.div``

const DiscussionBox = styled.section`
  // contains LeftComponent, TopMiddleComponent, BottomComponent
  padding: 5px;
  background: #ffffff;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 50px;
  grid-template-columns: 65px 1fr;
  grid-template-areas:
    'left topmiddle'
    'left bottom';
`

const LeftComponent = styled.div`
  // contains Upvote, Downvote, Likes
  display: grid;
  grid-template-rows: 1fr 30px 40px 30px 1fr;
  grid-area: left;
  justify-items: center;
  align-items: center;
`

const Upvote = styled.div`
  grid-row: 2/3;
`

const Likes = styled.div`
  grid-row: 3/4;
`

const Downvote = styled.div`
  grid-row: 4/5;
`

const TopMiddleComponent = styled.div`
    // contains DiscussionTitle, MoreOptions, DiscussionBody
    position: relative;
    grid-area: topmiddle;
    display: grid;
    grid-template-areas:
        "title moreoptions"
        "body moreoptions"
        "image moreoptions";
    grid-template-columns: 1fr 60px;
    grid-template-rows: 50px 1fr auto;
`;

const DiscussionTitleDiv = styled.div`
  grid-area: title;
  padding: 20px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DiscussionTitle = styled.text`
  justify-self: start;
  align-self: start;
  font-size: 2.5vh;
  font-weight: bold;
`

const MoreOptions = styled.div`
    position: relative;
    grid-area: moreoptions;
    align-self: start;
    justify-self: start;
`;

const DDMenu = styled.div`
    position: absolute;
    align-self: start;
    justify-self: center;
    background-color: white;
    display: grid;
    bottom: 25px;
    width: 150%;
`;

const Save = styled.button`
  padding: 5px;
`

const Expand = styled.button`
    padding: 5px;
`;

const AddTo = styled.button`
  padding: 5px;
`

const Report = styled.button`
  padding: 5px;
`

const Delete = styled.button`
  padding: 5px;
`

const DiscussionBody = styled.text`
  grid-area: body;
  padding: 10px 0px;
  font-size: 2vh;
  word-wrap: break-word;
  max-height: 100px;
`

const BottomComponent = styled.div`
  // contains Tags, ShareFacebook, ShareTwitter, Share
  grid-area: bottom;
  display: grid;
  grid-template-columns: 1fr 40px 40px 40px 15px;
  grid-template-areas: 'tags facebook twitter share .';
  justify-items: start;
  align-items: center;
`

const Tags = styled.div`
  // contains Tag, ViewTags
  grid-area: tags;
  word-wrap: break-word;
`

const Tag = styled.text`
  font-family: 'Avenir';
  font-size: 1.75vh;
  font-weight: bold;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 5px;
  margin-right: 7px;
  padding: 2px 5px;
`

const ViewTags = styled.button`
  border: none;
  background-color: inherit;
`

const ShareFacebook = styled.div`
  grid-area: facebook;
`

const ShareTwitter = styled.div`
  grid-area: twitter;
`

const Share = styled.div`
  grid-area: share;
`

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
  FullPostLink,
  Expand,
};
