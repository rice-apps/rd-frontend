import styled from 'styled-components'

export const Background = styled.div`
  display: grid;

  grid-template-columns: 2fr 12fr 5fr;

  /* grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr; */
  /* grid-template-rows: 12fr 12fr 1fr 1fr; */

  background-color: #f4efef;
`

export const PostFeedContainer = styled.div`
  margin-top: 8.6vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(255, 255, 255, 0.5) 0% 0% no-repeat padding-box;
  border: 0.16vw solid #ffffff;
  border-radius: 1.6vw;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
`

export const BannerContainer = styled.div`
  padding: 50px;
  width: 70%;
`

export const LeftSidebarContainer = styled.div`
  position: sticky;
  top: 5vh;

  margin-top: 12vh;
  justify-self: center;
  width: 3.5vw;
  height: 15vw;

  background: rgba(255, 255, 255, 0.65) 0% 0% no-repeat padding-box;
  border-radius: 1.3vw;
  border: 0.16vw solid #ffffff;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
`

export const RightSidebarContainer = styled.div`
  position: sticky;
  top: 5vh;

  margin-top: 8.6vh;
  justify-self: center;
  width: 20vw;
  height: calc(80vh);
  background: rgba(255, 255, 255, 0.5) 0% 0% no-repeat padding-box;
  border: 0.16vw solid #ffffff;
  border-radius: 1.6vw;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
`
export const NewPostButtonContainer = styled.div`
  padding-top: 1.6vw;

  width: 47vw;
  height: 3vw;

  justify-content: space-between;
`

export const NewPostButton = styled.div`
  display: flex;

  width: 10vw;
  height: 2.3vw;

  cursor: pointer;

  background: #ffffff93 0% 0% no-repeat padding-box;
  box-shadow: 0.1vw 0.1vw 0.5vw #7478861a;
  border-radius: 0.7vw;

  justify-content: flex-start;
  align-items: center;

  padding-left: 0.8vw;
`

export const ButtonText = styled.div`
  font-size: 0.9vw;
  padding-left: 1.3vw;
  padding-bottom: 0.2vw;
`
