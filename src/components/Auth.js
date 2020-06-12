import React from "react";
import { Redirect } from "react-router-dom";

import { useFetch } from "react-async";

import { BACKEND_AUTH_URL } from "../config";

const Auth = (successPath, errPath) => {
    const ticket = new URLSearchParams(window.location.search).get("ticket");

    const query = {
        ticket: ticket,
    };

    const { isPending, error, run } = useFetch(BACKEND_AUTH_URL, {
        method: "POST",
        body: JSON.stringify(query),
    });

    return err ? (
        <Redirect to={`/${errPath}`} />
    ) : (
        <Redirect to={`/${successPath}`} />
    );
};

export default Auth;
