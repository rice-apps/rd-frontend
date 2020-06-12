import React, { useState } from "react";

import Auth from "./Auth";
import { FRONTEND_AUTH_URL } from "../config";
import LoginButton from "./Login.styles";

function Login() {
    let [hasTicket] = useState(
        new URLSearchParams(window.location.search).has("ticket"),
    );

    return hasTicket ? (
        Auth("other", "login")
    ) : (
        <div style={{ height: "100vh", width: "100vw", textAlign: "center" }}>
            <LoginButton
                onClick={() => {
                    window.open(FRONTEND_AUTH_URL, "_self");
                }}
            >
                Login
            </LoginButton>
        </div>
    );
}

export default Login;
