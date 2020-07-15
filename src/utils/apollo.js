import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import possibleTypes from "./possibleTypes.json";

import { GQL_URL, WS_URL, TOKEN_NAME } from "./config";

const user = localStorage.getItem(TOKEN_NAME);
const token = user ? JSON.parse(user).token : "";

const httpLink = createHttpLink({
    uri: GQL_URL,
    credentials: "same-origin",
});

const wsLink = new WebSocketLink({
    uri: WS_URL,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: token,
        },
    },
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink,
);

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        },
    };
});

export default new ApolloClient({
    cache: new InMemoryCache({ possibleTypes }),
    link: authLink.concat(link),
});
