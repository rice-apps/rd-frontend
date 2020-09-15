import styled, { css } from 'styled-components/macro'

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
  position: fixed;
  top: 0;
  right: 0;
  // grid-column-start: 3;
  height: 100vh;
  // flex: 5;
  // width: 30vmax;
  width: 55vh;
  // flex: 3;

  background: #ffffff 0% 0% no-repeat padding-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  @media (max-aspect-ratio: 848/712) {
    order: 2;
    height: 90vh;
    top: 10vh;
  }
`

export const CloseButton = styled.div`
  height: 100vh;
  width: 5vh;
  
  // background: #FFFFFF 0% 0% no-repeat padding-box;
  background-color: #7380FF;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  
  @media (max-aspect-ratio: 848/712) {
    // order: 2;
    height: 90vh;
    top: 10vh;
  }
  
  &:hover {
    background-color: #333B8B;
  }
`

export const RightSidebar = styled.div`
  height: 100vh;
  width: 50vh;
  
  background: #FFFFFF 0% 0% no-repeat padding-box;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  
  @media (max-aspect-ratio: 848/712) {
    // order: 2;
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
  border: 0.2vh solid #9293a3;
  color: #9293a3;
  font-size: 2vh;
  border-radius: 37% / 117%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  cursor: pointer;
`

export const ProfileInner = styled.div`
  height: 65vh;
  width: 35vh;
  
  font-size: 2.2vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  // background-color: #bada55
`

export const UsernameEditable = styled.div`
  // margin-left: 0.25em;
  margin-right: 0.25em;
  padding-left: 0.25em;
  padding-right: 0.25em;

  // display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  max-width: 20em;
`

export const Divider = styled.div`
  height: 0.1vh;
  width: 100%;
  border: 0.2vh solid #cdced241;
`

export const Descriptor = styled.div`
  // height: 4vh;
  width: 100%;
  position: relative;
  
  display: flex;
  justify-content: space-between;
`

export const Headshot = styled.div`
  width: 13.5vh;
  height: 13.5vh;
  border-radius: 20%;
  // padding-top: 23.33%;
  
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  // background-color: red;
  
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  
  ${props =>
  css`
    background-image: url(${props.src});
  `}
  
`

export const AddPhotoButton = styled.div`
  width: 3.5vh;
  height: 3.5vh;
  background-color: #333B8B;
  border-radius: 3.5vh;
  cursor: pointer;
  
  position: relative;
  top: 1vh;
  left: 1vh;
  
  display: flex;
  align-items: center;
  justify-content: center;
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

  border: 0.2vh solid #9293a3;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DDList = styled.ul`
  position: absolute;
  z-index: 10;
  overflow-y: scroll;
  overflow-x: auto;
  width: 35vh;
  max-height: 25vh;
  // border: 1px solid rgb(223, 223, 223);
  // border-top: none;
  // border-bottom-left-radius: 3px;
  // border-bottom-right-radius: 3px;
  box-shadow: 0 2px 5px -1px rgb(232, 232, 232);
  background-color: #F4F4F4;
  // font-weight: 700;
  text-align: left;
  -webkit-overflow-scrolling: touch;
  
  padding-left: 0;
`

export const DDListItem = styled.li`
  display: inline;
  font-size: inherit;
  line-height: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  
  // padding-left: 0;
`

export const SavedPostsContainer = styled.div`
  height: 10vh;
  overflow-x: visible;
  overflow-y: auto;
  
  padding: 1vh;
  justify-self: center;
`