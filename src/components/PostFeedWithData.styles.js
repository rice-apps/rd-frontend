import styled from "styled-components";

export const Background = styled.div`
    display: grid;

    grid-template-columns: 2fr 12fr 5fr;

    /* grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr; */
    /* grid-template-rows: 12fr 12fr 1fr 1fr; */

    background-color: #f4efef;
`;

export const PostFeedContainer = styled.div`
    margin-top: 150px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: rgba(255, 255, 255, 0.5) 0% 0% no-repeat padding-box;
    border-radius: 20px;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
`;

export const BannerContainer = styled.div`
    padding: 50px;
    width: 70%;
`;

export const LeftSidebarContainer = styled.div`
    position: sticky;
    top: 150px;

    margin-top: 150px;
    justify-self: center;
    width: 3vw;
    height: calc(50vh);

    background: rgba(255, 255, 255, 0.65) 0% 0% no-repeat padding-box;
    border-radius: 20px;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
`;

export const RightSidebarContainer = styled.div`
    position: sticky;
    top: 150px;

    margin-top: 150px;
    justify-self: center;
    width: 20vw;
    height: calc(80vh);
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 20px;
    opacity: 0.7;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
`;
