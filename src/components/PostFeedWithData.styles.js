import styled from 'styled-components'

export const Background = styled.div`
  display: grid;

  grid-template-columns: 1fr 12fr 4fr;

  /* grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr; */
  /* grid-template-rows: 12fr 12fr 1fr 1fr; */

  background-color: #f4efef;
`

export const PostFeedContainer = styled.div`
  /* margin-top: 8.6vh; */

  display: flex;
  flex-direction: column;
  align-items: center;

  grid-column-start: 2;
  grid-column-end: 3;

  background-color: #EFF0F8;
  /* border: 0.16vw solid #ffffff;
  border-radius: 1.6vw;
  backdrop-filter: blur(30px); */
  /* -webkit-backdrop-filter: blur(30px); */
`

export const BannerContainer = styled.div`
  padding: 50px;
  width: 70%;
`

export const LeftSidebarContainer = styled.div`
  position: sticky;

  /* margin-top: 12vh; */
  justify-self: center;
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 2;

  background-color: #FFFFFF;
  box-shadow: 0px 0px .2vw white; 
  /* border-right: 0.16vw solid #ffffff; 
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px); */
`

export const RightSidebarContainer = styled.div`
  position: sticky;
  grid-column-start: 3;

  justify-self: center;
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  box-shadow: 0px 0px .2vw white; 
`
export const NewPostButtonContainer = styled.div`
  padding-top: 1vh;

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
  margin-left: -4vw;
  margin-top: 3vw;
`

export const ButtonText = styled.div`
  font-size: 0.9vw;
  padding-left: 1.3vw;
  padding-bottom: 0.2vw;
`
