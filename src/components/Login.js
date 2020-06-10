import React from "react";

import Auth from "./Auth";
import { FRONTEND_AUTH_URL } from "../config";
import LoginButton from "./Login.styles";

function Login() {
    let res = null;

    if (new URLSearchParams(window.location.search).has("ticket")) {
        res = Auth("other", "login");
    } else {
        res = (
            <div
                style={{ height: "100vh", width: "100vw", textAlign: "center" }}
            >
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

    return res;
}

export default Login;
