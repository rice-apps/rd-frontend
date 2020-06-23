import styled from "styled-components";


const DiscussionBoxSection = styled.section`
    padding: 10px 100px;
    background: papayawhip;
`;

const DiscussionBox = styled.section`
    padding: 5px;
    background: white;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 40px 1fr;
    grid-template-columns: 65px 1fr;
    grid-row-gap: 5px;
`;

const Icons = styled.div`
    grid-row: 1/3;
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
    grid-column: 2/3;
`;


export { DiscussionBoxSection, DiscussionBox, Icons, DiscussionTitle, DiscussionBody };
