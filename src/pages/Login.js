import React, { useState } from "react";

import Auth from "./Auth";
import { FRONTEND_AUTH_URL } from "../config";
// import LoginButton from "./Login.styles";
import './Login.css';

function Login() {
    let [hasTicket] = useState(
        new URLSearchParams(window.location.search).has("ticket"),
    );

    return hasTicket ? (
        Auth("discussions", "login")
    ) : (
        <div className = 'container'>
            <div className = 'login-image'>
            </div>
            <button className = 'login-button'
                onClick={() => {
                    window.open(FRONTEND_AUTH_URL, "_self");
                }}
            >
                Login
            </button>
            
        </div>
    );
}

export default Login;
