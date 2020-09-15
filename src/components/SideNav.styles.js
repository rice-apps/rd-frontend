import styled, { css } from 'styled-components/macro'
import LogoUrl from '../images/RD_logo.svg'

export const ChatLogo = styled.div`
  width: 9vh;
  height: 8vh;
  background-image: url(${LogoUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 95%;

  // background-color: red;

  // @media (max-aspect-ratio: 848/712) {
  //   width: 13vw;
  //   height: 11vw
  // }
`

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: green;
  // width: 100%;
  // @media (min-aspect-ratio: 848/712) {
    padding-top: 7vh;
    padding-bottom: 10vh;
  // }
  
  @media (max-aspect-ratio: 848/712) {
    width: 25vw;
    padding-top: 0;
    padding-bottom: 0;
  }
`

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: pink;

  justify-content: space-evenly;
  align-items: center;

  z-index: 12;
  
  height: 45vh;
  
  @media (max-aspect-ratio: 848/712) {
    flex-direction: row;
    width: 100%;
    height: inherit;
  }
`

export const NavElement = styled.div`
  height: 5.6vh;
  width: 5.6vh;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.72vh;
  border: 2px solid transparent;
  
  z-index: 13;

  cursor: pointer;

  // margin-bottom: 3.3vh;

  ${props =>
    !props.selected &&
    css`
      transition: background-color 0.3s ease-in-out;
      &:hover {
        background-color: rgba(229, 230, 247, 0.7);
      }
    `}

  ${props =>
    props.selected &&
    css`
      /* background: transparent linear-gradient(270deg, #ffa99c 0%, #ffc1b7 100%)
        0% 0% no-repeat padding-box;
      opacity: 0.8;
      box-shadow: 0.15vw 0.15vw 3vw #ffa99c7b; */
      background-color: #7380ff;
      box-shadow: 0 0.7vh 1vh -1vh black;
    `}
`

export const NavWrapper = styled.div`

  background-color: #FFFFFF;
  height: 100%;
  
  z-index: 11;
  
  @media (max-aspect-ratio: 848/712) {
    height: 10vh;
    display: flex;
    flex-direction: row;
    width: 100vw;
    justify-content: space-evenly;
    // background-color: red;
  }
`
