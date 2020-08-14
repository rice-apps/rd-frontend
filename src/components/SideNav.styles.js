import styled, { css } from 'styled-components'

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

  cursor: pointer;

  transition: all 0.5s ease-in-out;
  
  margin-bottom: 0.5vw;

  ${props =>
    props.first &&
    css`
      margin-top: 1.5vw;
    `}

  ${props =>
    props.selected &&
    css`
      background: transparent linear-gradient(270deg, #ffa99c 0%, #ffc1b7 100%)
        0% 0% no-repeat padding-box;
      opacity: 0.8;
      box-shadow: 0.15vw 0.15vw 3vw #FFA99C7B;
    `}
`
