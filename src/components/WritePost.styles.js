import styled from 'styled-components/macro'
import LoginBackground from '../images/backgroundLogin.svg'

const ExitButton = styled.div`
  grid-row: 1/2;
  grid-column: 2/2;

  border: 2px solid #cdced2;
  opacity: 1;

  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: red;
    opacity: 70%;
  }
`

const PostWrapper = styled.div`
  position: fixed;
  left: 14.6vw;
  top: 13vh;

  width: 51vw;
  height: 75vh;

  background: #ffffffe8 0% 0% no-repeat padding-box;
  opacity: 1;

  box-shadow: 1px 1px 20px #9398c334;
  border: 4px solid #ffffff;
  border-radius: 20px;

  display: grid;

  z-index: 1;
`

const Button = styled.button`
  border: 0.1vw solid #ffffff;
  color: black;
  text-align: center;
  text-decoration: none;

  font: Fira Sans;
  font-size: 0.8vw;
  padding-top: 0.5vh;
  padding-bottom: 0.5vh;
  padding-left: 1.6vw;
  padding-right: 1.6vw;
  cursor: pointer;
  background: #f5f7fc 0% 0% no-repeat padding-box;

  outline: none;
`

const PostingButton = styled.button`
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 1vw;
  cursor: pointer;

  background: #7380ff 0% 0% no-repeat padding-box;
  border-radius: 0.8vw;
  opacity: 1;

  width: 6.4vw;
  height: 4.2vh;

  outline: none;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 55vh;
`

const ButtonWrapper = styled.div`
  height: 3.2vh;

  border-radius: 0.7vw;

  margin-left: 1.4vw;

  display: flex;
  align-items: center;
`

const PostHeaderType = styled.p`
  position: relative;
  top: -5vh;
  text-align: center;
  background-color: #fabed6;
  width: 25vw;
  height: 10vw;

  font-family: Impact, Charcoal, sans-serif;
  font-size: 3vw;
  letter-spacing: 0.05vw;
  color: #000000;
  font-weight: 700;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: rotate(-38deg);
  grid-row: 1/2;
  grid-column: 1/3;

  border-top-right-radius: 26vw;
  border-bottom-right-radius: 26vw;
  border-bottom-left-radius: 4vw;
  border-top-left-radius: 26vw;
`

const TitleDescriptor = styled.p`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5vw;
  color: #000000;
  font-weight: 700;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  height: 4%;
  background-color: white;
`

const TitleWrapper = styled.div`
  height: 3.9vh;
  flex-direction: row;
  display: flex;
  align-self: flex-end;
`

const TitleBox = styled.input`
  background: #f4f4f49a 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  width: 16vw;
  height: 3.5vh;
  margin-left: 0.5vw;
  margin-right: 2vw;

  outline: none;

  overflow: hidden;
  white-space: nowrap;
  padding-left: 0.5vw;
`

const BodyBox = styled.textarea`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: none;

  width: 40vw;
  height: 14.8vh;

  resize: none;
`

const BodyWrapper = styled.div`
  height: 21vh;
  width: 43vw;

  background: #f5f7fc 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageWrapper = styled.div`
  position: relative;
  top: -2vh;
  width: 15vw;
  height: 30vh;
`

const ImageBox = styled.div`
  border: solid;
  position: relative;
  height: 20vh;
  padding: 0.6vw;
  border-radius: 0.5vw;
`

const ExtrasWrapper = styled.div`
  position: relative;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  width: 75vw;
  left: -22.8vw;
  top: -5vh;
`

const Banner = styled.div`
  background: url(${LoginBackground});
  background-color: #fffdfd;
  opacity: 1;
  width: 40vw;
  height: 20vh;
  background-size: 40vw;
  background-repeat: no-repeat;

  position: relative;
  top: 6vh;
`

const ModalTitle = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;

  text-align: left;
  color: #272848;
  font-size: 1.5vw;

  position: relative;
  left: 4vw;
  top: 4.7vh;
`

const FormWrapper = styled.div`
  grid-row: 2/2;
  grid-column: 1/2;

  width: 42vw;
  height: 58vh;

  position: relative;
  left: 4.5vw;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const DatesWrapper = styled.div`
  width: 21vw;
`

const TagWrapper = styled.div`
  height: 14.5vh;
  width: 43vw;

  background: #f5f7fc 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SelectCategoryWrapper = styled.div`
  height: 3.2vh;
  width: 43vw;
  line-height: 3.2vh;

  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  margin-bottom: 2vh;
`

const SuggestedTags = styled.div``

const LocationJobInfoWrapper = styled.div`
  height: 3.3vh;
  width: 40.2vw;

  display: flex;
  justify-content: flex-start;

  align-self: center;
  position: relative;
  top: 1vh;
`

const DraftSubmitWrapper = styled.div`
  height: 4.4vh;

  display: flex;
  justify-content: flex-end;
  align-items: baseline;
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

  cursor: pointer;
`

const RichEditorWrapper = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: none;

  width: 40vw;
  height: 13vh;

  overflow-y: auto;

  padding-left: 0.5vw;
  padding-top: 0.5vh;
`

const SuggestedTagsWrapper = styled.div`
  height: 2.9vh;

  align-self: center;
  width: 40.2vw;
`

const TagBox = styled.input`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: none;

  height: 4vh;
  width: 40vw;

  align-self: center;

  outline: none;
  padding-left: 0.5vw;
  border-radius: 0.5vw;

  margin-top: 0.7vh;
`

const Tag = styled.text`
  font-size: 1.75vh;
  font-weight: bold;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 5px;
  margin-left: 0.5vw;
  padding: 2px 5px;
`

const SaveAsDraft = styled.text`
  text-decoration: underline;
  color: #333b8b;
  opacity: 1;
  cursor: pointer;
  margin-right: 1vw;
`

const DatePickerWrapper = styled.div`
  width: 0.1vw;
  font-size: 0.5vw;
  display: block;
`

const DateBox = styled.div`
  background: #f5f7fc 0% 0% no-repeat padding-box;
  border-radius: 0.2vw;
  margin-left: 0.4vw;
  margin-right: 0.4vw;
  cursor: pointer;
  font-size: 0.8vw;
  width: 7.75vw;
  height: 3.6vh;

  align-items: center;
  display: flex;
  justify-content: center;
`

const LocationBox = styled.input`
  background: #f4f4f49a 0% 0% no-repeat padding-box;
  border-radius: 0.25vw;
  width: 8.6vw;
  height: 3.2vh;
  margin-left: 0.5vw;
  margin-right: 2vw;

  padding-left: 0.5vw;
  overflow: hidden;
  white-space: nowrap;

  outline: none;
  border: none;
`

const TagChosenWrapper = styled.div`
  text-align: left;
  font: Roman 16px/24px Avenir;
  letter-spacing: 0px;
  color: #a9abb4;
  opacity: 1;
  display: flex;

  position: relative;
  left: 1.8vw;
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
  ExtrasWrapper,
  Banner,
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
  SuggestedTagsWrapper,
  TagBox,
  Tag,
  SaveAsDraft,
  DatePickerWrapper,
  DateBox,
  LocationBox,
  TagChosen,
  TagChosenWrapper,
  TagCircle,
  StyledLink
}
