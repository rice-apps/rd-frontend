import styled, { css } from 'styled-components'

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7vh;
  padding-bottom: 10vh;
`

export const NavList = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
  align-items: center;
`

export const NavElement = styled.div`
  height: 2.6vw;
  width: 2.6vw;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8vw;
  border: 2px solid transparent;

  cursor: pointer;

  margin-bottom: 1.5vw;

  ${props =>
    props.first &&
    css`
      margin-top: 1.5vw;
    `}

  ${props =>
    !props.selected &&
    css`
      transition: background-color 0.3s ease-in-out;
      &:hover {
        background-color: rgba(229, 230, 247, .7);
      }
  `}

  ${props =>
    props.selected &&
    css`
      /* background: transparent linear-gradient(270deg, #ffa99c 0%, #ffc1b7 100%)
        0% 0% no-repeat padding-box;
      opacity: 0.8;
      box-shadow: 0.15vw 0.15vw 3vw #ffa99c7b; */
      background-color: #7380FF;
      box-shadow: 0 .7vh 1vh -1vh black;
    `}
`
