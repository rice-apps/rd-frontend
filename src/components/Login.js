import React, { useState } from "react";

import Auth from "./Auth";
import { LoginButton, LoginContainer, LoginImage } from "./Login.styles";

import { FRONTEND_AUTH_URL } from "../utils/config";
import { Helmet } from "react-helmet";

function Login() {
    let [hasTicket] = useState(
        new URLSearchParams(window.location.search).has("ticket"),
    );

    return hasTicket ? (
        Auth("more_info", "login")
    ) : (
        <LoginContainer>
            <Helmet>
                <title>RiceDiscuss &middot; Your Feed</title>
            </Helmet>
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
