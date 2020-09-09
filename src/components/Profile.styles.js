import styled from 'styled-components/macro'
import HeadshotUrl from "../images/headshot.svg";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  grid-column-start: 2;
  grid-column-end: 3;

  background-color: orange; //#eff0f8;
  /* border: 0.16vw solid #ffffff;
  border-radius: 1.6vw;
  backdrop-filter: blur(30px); */
  /* -webkit-backdrop-filter: blur(30px); */
`

export const RightSidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  // grid-column-start: 3;
  height: 100vh;
  // flex: 5;
  // width: 30vmax;
  width: 50vh;
  // flex: 3;
  
  background: #FFFFFF 0% 0% no-repeat padding-box;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  
  @media (max-aspect-ratio: 848/712) {
    order: 2;
    height: 90vh;
    top: 10vh;
  }
`

export const ProfileLogout = styled.div`
  height: 3.2vh;
  width: 80%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // background-color: red;
`

export const LogoutButton = styled.button`
  width: 27%;
  border: 0.2vh solid #9293A3;
  color: #9293A3;
  font-size: 2vh;
  border-radius: 37% / 117%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  cursor: pointer;
`

export const ProfileInner = styled.div`
  height: 72.7vh;
  width: 70%;
  
  font-size: 2.2vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  // background-color: #bada55
`

export const Divider = styled.div`
  height: 0.1vh;
  width: 100%;
  border: 0.2vh solid #CDCED241;
`

export const Descriptor = styled.div`
  // height: 4vh;
  width: 100%;
  
  display: flex;
  justify-content: space-between;
`

export const Headshot = styled.div`
  width: 13.5vh;
  height: 13.5vh;
  border-radius: 20%;
  // padding-top: 23.33%;
  background-image: url(${HeadshotUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  
  // background-color: red;
`


export const EditButton = styled.img`
  height: 1em;
  width: 1em;
  
  cursor: pointer;
`

export const BlockyText = styled.text`
  width: 100%;
  
  display: flex;
  justify-content: flex-start;
`

export const TextBlock = styled.div`
  margin-left: 0.25em;
  margin-right: 0.25em;
  padding-left: 0.25em;
  padding-right: 0.25em;
`

export const EditableTextBlock = styled.div`
  margin-left: 0.25em;
  margin-right: 0.25em;
  padding-left: 0.25em;
  padding-right: 0.25em;
  
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 10em;
  
`

export const SaveButton = styled.div`
  height: 3vh;
  width: 8vh;
  
  border-radius: 10%;
  cursor: pointer;
  
  border: 0.2vh solid #9293A3;
  display: flex;
  justify-content: center;
  align-items: center;
`