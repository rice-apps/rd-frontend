import styled from "styled-components";

import LoginBackground from "../images/backgroundLogin.svg";

const Banner = styled.div`
    // Image at the top
    padding: 100px 100px;
    background: url(${LoginBackground});
    background-color: #FFFDFD;
    opacity: 1;
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 20px;
`;

export { Banner };
