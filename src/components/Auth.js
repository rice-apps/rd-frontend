import React from "react";
import { Redirect } from "react-router-dom";

import { useAsync } from "react-async";

import { BACKEND_AUTH_URL } from "../config";

async function doBackendAuth({ query }, { signal }) {
    let response = await fetch(BACKEND_AUTH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
        signal: signal,
    });

    console.log(response);

    if (!response.ok) {
        console.log("Not okay!");
        throw new Error(response.status);
    }

    const data = await response.json();

    console.log(data);

    if (!data.success) {
        console.log("No success!");
        throw new Error(data.success);
    }

    localStorage.setItem("RICE_DISCUSS_TOKEN", data.user.token);

    return data.user.netID;
}

const Auth = (successPath, errPath) => {
    const ticket = new URLSearchParams(window.location.search).get("ticket");

    const query = {
        ticket: ticket,
    };

    const { err } = useAsync({ promiseFn: doBackendAuth, query });

    return err ? (
        <Redirect to={`/${errPath}`} />
    ) : (
        <Redirect to={`/${successPath}`} />
    );
};

export default Auth;
