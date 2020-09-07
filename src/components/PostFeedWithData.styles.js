import styled from 'styled-components/macro'

export const Background = styled.div`
  // display: grid;
  display: flex;
  flex-direction: row;
  
  // grid-template-columns: 1fr 16fr;

  /* grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr; */
  /* grid-template-rows: 12fr 12fr 1fr 1fr; */

  background-color: #f4efef;
  // background-color: #bada55;
`

export const FeedProfileContainer = styled.div`
  display: flex;
  flex-direction: row;

  // grid-column-start: 2;
  flex: 16
`

export const PostFeedContainer = styled.div`
  /* margin-top: 8.6vh; */
  
  flex: 13;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #eff0f8;
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
  top: 0;

  /* margin-top: 12vh; */
  justify-self: center;
  width: 100%;
  height: 100vh;
  // grid-column-start: 1;
  // grid-column-end: 2;
  flex: 1;

  background-color: #ffffff;
  box-shadow: 0px 0px 0.2vw white;
  /* border-right: 0.16vw solid #ffffff; 
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px); */
`

export const RightSidebarContainer = styled.div`
  position: sticky;
  top: 0;
  
  // flex: 5vh/vw;

  justify-self: center;
  // width: 100%;
  height: 100vh;
  // background-color: orange;
  box-shadow: 0px 0px 0.2vw white;
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
