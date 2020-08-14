import log from 'loglevel'

const CAS_AUTH_URL = process.env.REACT_APP_CAS_AUTH_URL
const SERVICE_URL = process.env.REACT_APP_SERVICE_URL
const BACKEND_AUTH_URL = process.env.REACT_APP_BACKEND_AUTH_URL
const GQL_URL = process.env.REACT_APP_GQL_URL
const WS_URL = process.env.REACT_APP_WS_URL
const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME

const FRONTEND_AUTH_URL = `${CAS_AUTH_URL}?service=${SERVICE_URL}`

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  log.setLevel('trace')
}

function loadToken () {
  return window.localStorage.getItem(TOKEN_NAME) != null
    ? window.localStorage.getItem(TOKEN_NAME)
    : ''
}

export {
  CAS_AUTH_URL,
  SERVICE_URL,
  FRONTEND_AUTH_URL,
  BACKEND_AUTH_URL,
  GQL_URL,
  WS_URL,
  TOKEN_NAME,
  loadToken
}
