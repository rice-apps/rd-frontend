import React, { useEffect } from "react";

import LoginButton from "./Login.styles";

function Login() {
    const cas_auth_url = "https://idp.rice.edu/idp/profile/cas/login";
    const service_url = "http://localhost:3000/login";
    const url = cas_auth_url + "?service=" + service_url;

    const backend_url = "http://localhost:3001/login";

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ticket = urlParams.get("ticket");

        if (ticket) {
            console.log(ticket);
            let query = {
                ticket: ticket,
            };

            fetch(backend_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(query),
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    return (
        <LoginButton
            onClick={() => {
                window.open(url, "_self");
            }}
        >
            Login
        </LoginButton>
    );
}

export default Login;
