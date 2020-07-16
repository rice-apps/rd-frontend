import styled from "styled-components";

const FullGrid = styled.div`
    display: grid;

    grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr;
    grid-template-rows: 12fr 12fr 1fr 1fr;

    height: calc(90vh);

    position: relative;
    margin-top: 2%;
    margin-bottom: 2%;
`;

const PinkShape = styled.div`
    position: relative;
    top: 5%;
    transform: rotate(-38deg);

    background-color: pink;

    grid-row: 1/3;
    grid-column: 2/4;

    border-top-right-radius: 30vw;
    border-bottom-right-radius: 33vw;
    border-bottom-left-radius: 35vw;
    border-top-left-radius: 26vw;
`;

const LaptopGirl = styled.img`
    position: relative;
    top: -6%;
    left: 14%;

    width: 40%;
    height: 18vw;

    transform: rotate(38deg);
`;

const AboutMyself = styled.p`
    transform: rotate(38deg);
    position: relative;
    top: 32vh;
    left: 11vw;
`;

const TextField = styled.input`
    padding: 5px;
    width: 150px;
    margin: 5px 0;
    border: 0;
    border-radius: 6vw;
    border: 1px solid rgb(223, 223, 223);
    background-color: white;
    line-height: 19px;
`;

const FieldSetStyle = styled.fieldset`
    position: relative;
    bottom: 0px;
    border: 0;
    left: 0px;
`;

const TotalForm = styled.fieldset`
    width: 9vw;
    height: 75vh;
    transform: rotate(38deg);
    position: relative;
    top: -26vh;
    left: -8vw;
    border-color: transparent;
`;

const MarginsForm = styled.form`
    margin: 0px 25.5vw;
`;

const SubmitButton = styled.button`
    padding: 10px;
    width: 50px;
    margin: 10px 5px;
    border: 0;
    background-color: rgb(129, 212, 45);
    opacity: 100%;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    margin-left: 14px;

    &:hover {
        background-color: rgb(141, 250, 33);
    }
`;

const DDWrapper = styled.div`
    position: relative;
    width: 222px;
    font-size: 1rem;
    user-select: none;
    margin-bottom: 15px;
`;

const DDHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border: 1px solid rgb(223, 223, 223);
    background-color: white;
    line-height: 38px;
    cursor: default;
    cursor: pointer;
    border-radius: 20px;
    margin-left: 12px;
    width: 16vw;
    height: 5vh;
`;

const DDHeaderTitle = styled.div`
    margin: 0px 20px;
    margin-right: 10px;
    font-weight: 600;
`;

const DDList = styled.ul`
    position: absolute;
    z-index: 10;
    overflow-y: scroll;
    overflow-x: auto;
    width: 100%;
    max-height: 215px;
    border: 1px solid rgb(223, 223, 223);
    border-top: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: 0 2px 5px -1px rgb(232, 232, 232);
    background-color: white;
    font-weight: 700;
    text-align: left;
    -webkit-overflow-scrolling: touch;
`;

const DDListItem = styled.li`
    display: inline;
    width: 100%;
    font-size: 0.8rem;
    line-height: 1.4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
`;

const ArrowI = styled.i`
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 2.5px;
    margin: 2.5px;
    margin-left: 13px;

    transform: ${(props) => (props.open ? "rotate(-135deg)" : "rotate(45deg)")};
    -webkit-transform: ${(props) =>
        props.open ? "rotate(-135deg)" : "rotate(45deg)"};
`;

export {
    FullGrid,
    PinkShape,
    LaptopGirl,
    AboutMyself,
    TextField,
    FieldSetStyle,
    TotalForm,
    MarginsForm,
    SubmitButton,
    DDWrapper,
    DDHeader,
    DDHeaderTitle,
    DDList,
    DDListItem,
    ArrowI,
};
