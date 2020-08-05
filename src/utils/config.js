const CAS_AUTH_URL = "https://idp.rice.edu/idp/profile/cas/login";
const SERVICE_URL = "http://localhost:3000/login";
const FRONTEND_AUTH_URL = `${CAS_AUTH_URL}?service=${SERVICE_URL}`;
const BACKEND_AUTH_URL = "http://localhost:3001/login";
const GQL_URL = "http://localhost:3001/graphql";
const WS_URL = "ws://localhost:3001/graphql";
const TOKEN_NAME = "RD_TOKEN";

export {
    CAS_AUTH_URL,
    SERVICE_URL,
    FRONTEND_AUTH_URL,
    BACKEND_AUTH_URL,
    GQL_URL,
    WS_URL,
    TOKEN_NAME,
};
