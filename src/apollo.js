import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

import { GQL_URL, WS_URL, TOKEN_NAME } from "./config";

const user = localStorage.getItem(TOKEN_NAME);
const token = user ? JSON.parse(user).token : "";

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

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
    cache: new InMemoryCache({ fragmentMatcher: fragmentMatcher }),
    link: authLink.concat(link),
});
