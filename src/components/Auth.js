import React from "react";
import { Redirect } from "react-router-dom";

import { useFetch, IfFulfilled, IfRejected } from "react-async";

import { BACKEND_AUTH_URL, TOKEN_NAME } from "../config";

const Auth = (successPath, errPath) => {
    const ticket = new URLSearchParams(window.location.search).get("ticket");

    const query = {
        ticket: ticket,
    };

    const state = useFetch(
        BACKEND_AUTH_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
        },
        {
            defer: false,
            onResolve: (data) => {
                localStorage.setItem(TOKEN_NAME, data.user.token);
            },
            onReject: (error) => {
                console.log("This is error");
                console.log(error);
            },
            json: true,
        },
    );

    return (
        <div>
            <IfFulfilled state={state}>
                <Redirect to={`/${successPath}`} />
            </IfFulfilled>
            <IfRejected state={state}>
                <Redirect to={`/${errPath}`} />
            </IfRejected>
        </div>
    );
};

export default Auth;
