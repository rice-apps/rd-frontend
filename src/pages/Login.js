import React, { useState } from "react";

import Auth from "../components/Auth";
import { LoginButton, LoginContainer, LoginImage } from "./Login.styles";

import { FRONTEND_AUTH_URL } from "../utils/config";

function Login() {
    let [hasTicket] = useState(
        new URLSearchParams(window.location.search).has("ticket"),
    );

    return hasTicket ? (
        Auth("discussions", "login")
    ) : (
        <LoginContainer>
            <LoginImage />
            <LoginButton
                onClick={() => {
                    window.open(FRONTEND_AUTH_URL, "_self");
                }}
            >
                Login
            </LoginButton>
        </LoginContainer>
    );
}

export default Login;
