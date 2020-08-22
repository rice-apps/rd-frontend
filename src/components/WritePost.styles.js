import styled from 'styled-components'
import LoginBackground from '../images/backgroundLogin.svg'

const ExitButton = styled.div`
  cursor: pointer;
  background-color: beige;
  &:hover {
    background-color: red;
  }

  position: relative;
  left: 15vw;
  bottom: 10vh;

  transform: rotate(65deg);
  grid-row: 1/2;
  grid-column: 3/3;

  border-radius: 26vw;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 15vw;
  height: 15vw;

  font-family: Helvetica, Charcoal, sans-serif;
  font-size: 10vw;
  color: #000000;
  font-weight: 700;
`

const PostWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 80%;
  height: 80%;
  border-style: solid;
  border-color: green;

  display: grid;
  // flex-direction: column;
  // align-items: center;

  grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr;
  grid-template-rows: 12fr 12fr 1fr 1fr;

  border-radius: 1.6vw;
`

const Button = styled.button`
  background-color: lightpink; /* Green */
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  // z-index: 5;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #de4783;
    opacity: 50%;
  }
`

const PostingButton = styled.button`
  position: relative;
  background-color: #fabed6; /* Light pink */
  border: none;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 3vw;
  cursor: pointer;

  border-radius: 0.5vw;
  width: 15vw;
  height: 30vh;

  &:hover {
    background-color: #de4783;
    opacity: 50%;
  }
`

const Form = styled.form`
  // background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  width: 50vw;
  height: 90vh;
  top: -30vh;
  left: 22vw;

  grid-row: 2/2;
  grid-column: 2/3;
`

const ButtonWrapper = styled.div`
  position: absolute;
  // left: 50%;
  left: 42.5vw;
  top: 0;
  // transform: translate(-50%, 0%);
`

const PostHeaderType = styled.p`
  position: relative;
  top: -5vh;
  // right: 10vw;
  text-align: center;
  // color: blue;
  font-size: 2em;
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
  position: relative;
  top: -4vh;
  width: 40vw;
`

const TitleBox = styled.div`
  border: solid;
  position: relative;
  height: 7vh;
  flex: 0 0 100%;
  border-radius: 0.5vw;
`

const BodyBox = styled.div`
  border: solid;
  position: relative;
  height: 20vh;
  width: 60vw;
  border-radius: 0.5vw;
`

const BodyWrapper = styled.div`
  position: relative;
  top: -5vh;
  left: -8vw;
`

const ImageWrapper = styled.div`
  position: relative;
  top: -2vh;
  width: 15vw;
  // left: -22vw;
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
  // background-color: red;
  left: -22.8vw;
  top: -5vh;
`

const Banner = styled.div`
  // Image at the top
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
  Banner
}
