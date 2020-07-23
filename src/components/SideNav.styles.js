import styled, { css } from "styled-components";

export const NavList = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-evenly;
    align-items: center;
`;

export const NavElement = styled.div`
    height: 66px;
    width: 66px;

    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) =>
        props.first &&
        css`
            margin-top: 50px;
        `}

    ${(props) =>
        props.selected &&
        css`
            background: transparent
                linear-gradient(270deg, #ffa99c 0%, #ffc1b7 100%) 0% 0%
                no-repeat padding-box;
            border-radius: 20px;
            opacity: 0.8;
        `}
`;
