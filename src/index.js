import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import GlobalStyle from "./index.styles";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { GQL_URL } from "./config";

const httpLink = createHttpLink({
    uri: GQL_URL,
    credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("RD_TOKEN");

    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
