import styled from 'styled-components/macro'

import LoginBackground from '../images/backgroundLogin.svg'

// Image at top

const Banner = styled.div`
  padding: 100px 100px;
  background: url(${LoginBackground});
  background-color: #fffdfd;
  opacity: 1;
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 20px;
`

export { Banner }
