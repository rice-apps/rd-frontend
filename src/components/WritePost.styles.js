import styled from 'styled-components/macro'

const ExitButton = styled.div`  
  position: relative;
  right: 5vh;
  top: 2vh;

  width: 2vh;
  height: 2vh;
  // text-align: center;
  cursor: pointer;
`

const PostWrapper = styled.div`
  position: fixed;
  
  left: 70%;
  top: 50%;
  transform: translate(-70%, -50%);

  width: 100vh;
  
  height: 85vh;

  // background: #ffffffe8 0% 0% no-repeat padding-box;
  background-color: #FFFFFF;
  opacity: 1;

  box-shadow: 0.1vh 0.1vh 1.85vh #9398c334;
  border: 0.37vh solid #ffffff;
  border-radius: 1.85vh;

  z-index: 1;
  
  @media (max-aspect-ratio: 848/712) {
    width: 91vw;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -90%);
  }
`

const Button = styled.button`
  border: 0.15vh solid #ffffff;
  color: black;
  text-align: center;
  text-decoration: none;

  font: Fira Sans;
  font-size: 1.6vh;
  padding-top: 0.6vh;
  padding-bottom: 0.7vh;
  padding-left: 2.7vh;
  padding-right: 2.7vh;
  cursor: pointer;
  background: #f5f7fc 0% 0% no-repeat padding-box;

`

const PostingButton = styled.button`
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 2vh;
  cursor: pointer;

  background: #7380ff 0% 0% no-repeat padding-box;
  border-radius: 1.4vh;
  opacity: 1;

  width: 11.4vh;
  height: 4.2vh;

`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 55vh;
`

const ButtonWrapper = styled.div`
  height: 3.2vh;

  border-radius: 1.4vh;

  // padding-left: 2.7vh;
  margin-left: 2.7vh;
  margin-top: 0.2vh;

  display: flex;
  align-items: center;
`

const TitleWrapper = styled.div`
  // height: 3.9vh;
  // flex-direction: row;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: baseline;
  padding-left: 4.8vh;
  // margin-bottom: 1vh;
  // padding-bottom: 1vh;
  
  // background-color: red;
  
  flex-wrap: wrap;
  
  @media (max-aspect-ratio: 848/712) {
    align-self: center;
    padding-left: 0;
  }
`

const TitleBox = styled.input`
  background: #f4f4f49a 0% 0% no-repeat padding-box;
  border-radius: 0.46vh;
  opacity: 1;
  
  font-size: inherit;
  
  width: 28.8vh;
  height: 3.5vh;
  margin-left: 1vh;
  margin-right: 2vh;
  margin-bottom: 1vh;

  border: none;

  overflow: hidden;
  white-space: nowrap;
  padding-left: 1vh;
`

const BodyWrapper = styled.div`
  height: 23vh;
  width: 90vh;

  background: #f5f7fc 0% 0% no-repeat padding-box;
  border-radius: 1.3vh;
  opacity: 1;

  display: flex;
  flex-direction: column;
  align-items: center;  
  
  @media (max-aspect-ratio: 848/712) {
    width: 76.6vw;
  }
`

const ModalTitle = styled.div`
  text-align: left;
  text-decoration: none;
  color: #272848;
  font-size: 3.5vh;
  
  height: 10vh;

  // position: relative;
  // left: 7.1vh;
  // top: 4.7vh;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  // background-color: red;
  
  // padding-left: 7vh;
  // padding-right: 7vh;
  // padding-top: 1vh;
  // padding-bottom: 1vh;
  
  @media (max-aspect-ratio: 848/712) {
    // padding-left: 2vh;
    // padding-right: 2vh;
  }
`

const FormWrapper = styled.div`
  height: 87%;
  
  font-size: 2.5vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  // padding-top: 0.vh;
  padding-bottom: 0.5vh;
  padding-left: 7vh;
  padding-right: 7vh;
  // background-color: #bada55;
`

const DatesWrapper = styled.div`
  // padding-left: 3.6vh;
  // background-color: pink;
  display: flex;
  align-items: center;
  z-index: 5;
`

const TagWrapper = styled.div`
  height: 11.3vh;
  width: 90vh;

  background: #f5f7fc 0% 0% no-repeat padding-box;
  // background-color: red;
  border-radius: 1.4vh;
  opacity: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
  @media (max-aspect-ratio: 848/712) {
    width: 76.6vw;
  }
`

const SelectCategoryWrapper = styled.div`
  // line-height: 3.2vh;
  
  // background-color: green;

  display: flex;
  justify-content: center;
  align-items: baseline;
  // margin-bottom: 2vh;
  
  flex-wrap: wrap;
`

const SuggestedTags = styled.div``

const LocationJobInfoWrapper = styled.div`
  // height: 3.3vh;
  // width: 90%;

  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  
  // font-size: 2vh;
  
  // background-color: #bada55;

  align-self: flex-start;
  position: relative;
  
  padding-left: 5vh;
  
  // background-color: pink;
  
  @media (max-aspect-ratio: 848/712) {
    padding-left: 0;
    align-self: center;
  }
`

const DraftSubmitWrapper = styled.div`
  // height: 4.4vh;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  align-self: flex-end;
  
  // background-color: red;
  padding-right: 4.8vh;

  @media (max-aspect-ratio: 848/712) {
    padding-right: 0;
  }
`

const RichIcons = styled.div`
  height: 4.4vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5vh;
  width: 100%;
  
`

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  // width: 2vh;
  // height: 2vh;

  cursor: pointer;
`

const RichEditorWrapper = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: none;
  
  width: 85vh;
  height: 14.9vh;

  overflow-y: auto;

  padding-left: 0.5vh;
  padding-top: 0.5vh;
  
  @media (max-aspect-ratio: 848/712) {
    width: 71.9vw;
  }
`

const TagsListWrapper = styled.div`
  // height: 2.9vh;
  // background-color: red;
  // width: 90%;
  // font-size: 2vh;
  display: flex;
  align-items: center;

  align-self: flex-start;
  flex-wrap: wrap;
  padding-left: 5vh;
  
  @media (max-aspect-ratio: 848/712) {
    padding-left: 0;
    align-self: center;
  }
`

const TagBox = styled.input`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: none;

  height: 4vh;
  width: 85vh;
  font-size: 2vh;

  align-self: center;

  padding-left: 0.9vh;
  border-radius: 0.9vh;
  
  @media (max-aspect-ratio: 848/712) {
    width: 71.9vw;
  }
`

const Tag = styled.text`
  font-size: 1.75vh;
  font-weight: bold;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 0.74vh;
  margin-left: 0.9vh;
  padding: 0.6vh 1.6vh;
  white-space: nowrap;
  
  cursor: crosshair;
  
  &:hover {
    // background-color: gray;
    opacity: 30%;
  }
`

const SaveAsDraft = styled.text`
  text-decoration: underline;
  color: #333b8b;
  opacity: 1;
  cursor: pointer;
  margin-right: 3vh;
`

const DateBox = styled.div`
  background: #f5f7fc 0% 0% no-repeat padding-box;
  border-radius: 0.5vh;
  margin-left: 1vh;
  margin-right: 1vh;
  cursor: pointer;
  font-size: 1.9vh;
  width: 13.7vh;
  height: 3.7vh;

  align-items: center;
  display: flex;
  justify-content: center;
`

const LocationBox = styled.input`
  background: #f4f4f49a 0% 0% no-repeat padding-box;
  border-radius: 0.5vh;
  width: 15.4vh;
  height: 3.2vh;
  margin-left: 1.5vh;
  margin-right: 1.5vh;
  
  font-size: inherit;

  padding-left: 1vh;
  overflow: hidden;
  white-space: nowrap;

  border: none;
`

const TagChosenWrapper = styled.div`
  text-align: left;
  // font: Roman 16px/24px Avenir;
  // letter-spacing: 0px;
  color: #a9abb4;
  opacity: 1;
  display: flex;

  position: relative;
  left: 4vh;
`

const TagChosen = styled.div`
  padding: 0px 10px 0px 5px;
  height: 24px;
  margin-left: 5px;
  background: #9bbad1 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 30px 10px 10px 30px;
  text-align: left;
  font: Heavy 14px/17px Avenir;
  letter-spacing: 0px;
  color: #ffffff;
  &:hover {
    background-color: red;
    opacity: 70%;
  }
`

const TagCircle = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
  opacity: 0.85;
  border-radius: 75px;
`

const StyledLink = styled.a`
  color: '#3b5998';
  text-decoration: 'underline';
`

const StereoButton = styled.div`
  width: 2.5vh;
  height: 2.5vh;
  background-color: #F5F7FC;
  border-radius: 0.5vh;
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  margin-left: 1.5vh;
  margin-right: 1.5vh;
`

const StereoButtonCheck = styled.div`
  width: 1.5vh;
  height: 1.5vh;
  background-color: #9BA5FF;
  border-radius: 0.3vh;
`

export {
  PostWrapper,
  Button,
  ButtonWrapper,
  Form,
  TitleWrapper,
  TitleBox,
  BodyWrapper,
  PostingButton,
  ExitButton,
  ModalTitle,
  FormWrapper,
  DatesWrapper,
  TagWrapper,
  SelectCategoryWrapper,
  SuggestedTags,
  LocationJobInfoWrapper,
  DraftSubmitWrapper,
  RichIcons,
  IconButton,
  RichEditorWrapper,
  TagsListWrapper,
  TagBox,
  Tag,
  SaveAsDraft,
  DateBox,
  LocationBox,
  TagChosen,
  TagChosenWrapper,
  TagCircle,
  StyledLink,
  StereoButton,
  StereoButtonCheck
}
