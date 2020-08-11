import styled from "styled-components";

const TitleFlex = styled.div`
    display: flex;
    flex-direction: row;
    width: inherit;
    justify-content: space-around;

    // top: 185px;
    // left: 528px;
    ///width: 231px;
    // height: 54px;
    margin: 25px;
    text-align: left;
    font: Roman 48px/44px Avenir;
    letter-spacing: 0px;
    color: #747886;
    opacity: 1;

`;

const ExitButton = styled.div`
    align-self: flex-start;
    cursor: pointer;
    &:hover {
        background-color: red;
    }

    // top: 177px;
    // left: 1392px;
    width: 20px;
    height: 20px;
    border: 2px solid #CDCED2;
    opacity: 1;
    text-align: center;
`;

const PostWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // background-color: white;
    // width: 98.4%;
    // height: 80.9%;
    // border-style: solid;
    // border-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-between;

    // top: 144px;
    // left: 468px;
    width: 984px;
    height: 90vh;
    background: #FFFFFFE8 0% 0% no-repeat padding-box;
    border: 4px solid #FFFFFF;
    border-radius: 20px;
    opacity: 1;
`;

const Button = styled.button`
    // background-color: lightpink; /* Green */
    border: none;
    // color: black;
    // padding: 15px 32px;
    // text-align: center;
    // text-decoration: none;
    // display: inline-block;
    // font-size: 16px;
    // z-index: 5;
    margin: 5px;
    cursor: pointer;
    &:hover {
        font: Heavy 14px/17px Avenir;
        color: #A86565;
    }

    // top: 263px;
    // left: 757px;
    width: 59px;
    height: 21px;
    text-align: center;
    font: Medium 14px/17px Avenir;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    background-color: #E7C6C6;
`;

const PostingButton = styled.button`
    position: relative;
    // background-color: #fabed6; /* Light pink */
    border: none;
    // color: black;
    padding: 15px 32px;
    text-align: center;
    // text-decoration: none;
    display: inline-block;
    // font-size: 16px;
    cursor: pointer;
    z-index: 5;
    margin: 5px;
    &:hover {
        background-color: #E7C6C6;
        opacity: 100%;
    }

    //top: 849px;
    //left: 1222px;
    width: 114px;
    height: 46px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    font: Medium 20px/17px Avenir;
    letter-spacing: 0px;
    color: #747886;
    border: 2px solid #CDCED2;
    border-radius: 20px;
    opacity: 1;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-content: space-around;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    //width: 850px;
    // background-color: green;
    // background-color: white;
    // position: relative;
    // display: flex;
    // flex-direction: column;
    // flex-wrap: wrap;
    // width: 95%;
    // height: 90%;
    // top: -5%;
`;

const ButtonWrapper = styled.div`
    // position: absolute;
    // left: 50%;
    // top: 0%;
    // transform: translate(-50%, 0%);

    // top: 257px;
    // left: 733px;
    width: 382px;
    height: 31px;
    background: #E7C6C6 0% 0% no-repeat padding-box;
    border-radius: 15px;
    opacity: 1;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    //top: -30px;
    display: flex;
    justify-content: space-between;
`;

const TitleBox = styled.div`
    border: solid;
    //position: relative;
    // height: 5vh;
    //flex: 0 0 100%;

    //top: 315px;
    // left: 574px;
    width: 386px;
    height: 42px;
    background: #F4F4F49A 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;

    text-align: left;
    vertical-align: middle;
    font: Roman 21px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;

`;

const BodyBox = styled.div`
    border: solid;
    position: relative;
    // height: 10vh;

    //top: 427px;
    // left: 587px;
    width: 741px;
    height: 160px;
    background: #F8F8F8 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;

    text-align: left;
    font: Roman 18px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;
`;

const BodyWrapper = styled.div`
    position: relative;
    //top: -60px;
    //top: 380px;
    display: flex;
    align-items: center;
    justify-content: center;

    // left: 565px;
    width: 790px;
    height: 229px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 2px solid #CDCED2;
    border-radius: 15px;
    opacity: 1;
`;

const ImageWrapper = styled.div`
    display: flex;
    //position: relative;
    //top: -90px;
`;

const ImageBox = styled.div`
    border: solid;
    position: relative;
    // height: 10vh;
    padding: 10px;

    //top: 629px;
    // left: 565px;
    width: 790px;
    height: 45px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 2px solid #CDCED2;
    border-radius: 15px;
    opacity: 1;

    text-align: left;
    font: Roman 18px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;
`;

const DateWrapper = styled.div`
    margin: 10px;
    display: flex;
    justify-content: space-between;
    text-align: left;
    font: Medium 18px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;
    opacity: 1;
`;

const PaidWrapper = styled.div`
    display: flex;
    text-align: left;
    margin-left: 20px;
    font: Roman 18px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;
`;

const LocationWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: left;
    font: Medium 18px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;
    opacity: 1;
`;

const LocationBox = styled.div`
    width: 166px;
    height: 39px;
    margin-left: 5px;
    background: #F4F4F49A 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
`;

const JobWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TagWrapper = styled.div`
    width: 790px;
    height: 150px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 2px solid #CDCED2;
    border-radius: 15px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    text-align: left;
    font: Roman 18px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;
    opacity: 1;
`;

const TagBox = styled.div`
    width: 741px;
    height: 44px;
    background: #F8F8F8 0% 0% no-repeat padding-box;
    border-radius: 10px;
    opacity: 1;
`;

const TagChosenWrapper = styled.div`
    width: 741px;
    height: 30px;
    text-align: left;
    text-align: left;
    font: Roman 16px/24px Avenir;
    letter-spacing: 0px;
    color: #A9ABB4;
    opacity: 1;
    display: flex;
`;

const TagChosen = styled.div`
    width: 124px;
    height: 24px;
    margin-left: 5px;
    background: #9BBAD1 0% 0% no-repeat padding-box;
    opacity: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 30px 10px 10px 30px;
    text-align: left;
    font: Heavy 14px/17px Avenir;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
`;

const TagCircle = styled.div`
    width: 7px;
    height: 7px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 0.85;
    border-radius: 75px;
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
    TitleFlex,
    DateWrapper,
    PaidWrapper,
    JobWrapper,
    LocationBox,
    LocationWrapper,
    TagBox,
    TagWrapper,
    TagChosen,
    TagChosenWrapper,
    TagCircle,
};
