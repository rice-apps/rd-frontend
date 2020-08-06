import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { LOGIN } from "../graphql/Mutations";
import { TOKEN_NAME } from "../utils/config";

const Auth = (successPath, errPath) => {
    const ticket = new URLSearchParams(window.location.search).get("ticket");

    const [login, { data, loading, error }] = useMutation(LOGIN, {
        variables: {
            ticket,
        },
    });

    useEffect(() => {
        login().catch(() => <Redirect to={`/${errPath}`} />);
        // eslint-disable-next-line
    }, []);

    if (error) return <Redirect to={`/${errPath}`} />;

    if (loading) return <div>Loading...</div>;

    if (!data) return <div>Login went wrong</div>;

    localStorage.setItem(TOKEN_NAME, JSON.stringify(data.userAuthentication));

    return <Redirect to={`/${successPath}`} />;
};

export default Auth;
