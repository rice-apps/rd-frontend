const CAS_AUTH_URL = "https://idp.rice.edu/idp/profile/cas/login";
const SERVICE_URL = "http://localhost:3000/login";
const FRONTEND_AUTH_URL = CAS_AUTH_URL + "?service=" + SERVICE_URL;
const BACKEND_AUTH_URL = "http://localhost:3001/login";

export { CAS_AUTH_URL, SERVICE_URL, FRONTEND_AUTH_URL, BACKEND_AUTH_URL };
