import styled from 'styled-components/macro'

import LoginBackground from '../images/backgroundLogin.svg'

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LoginImage = styled.div`
  width: 100vw;
  padding-top: 23.33%;
  background-image: url(${LoginBackground});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`

const LoginButton = styled.button`
  background: white;
  color: palevioletred;
  font-size: 1vw;
  padding: 0.25vw 1vw;
  border: 0.1vw solid palevioletred;
  border-radius: 0.3vw;
`

export { LoginButton, LoginContainer, LoginImage }
