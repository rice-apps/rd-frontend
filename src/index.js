import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "@apollo/react-hooks";

import client from "./utils/apollo";

import App from "./App";
import GlobalStyle from "./index.styles";

import * as serviceWorker from "./serviceWorker";

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
