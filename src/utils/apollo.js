import {
  createHttpLink,
  split,
  makeVar,
  ApolloClient,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import {
  getMainDefinition,
  relayStylePagination
} from '@apollo/client/utilities'

import possibleTypes from './possibleTypes.json'

import { GQL_URL, WS_URL, loadToken } from '../config'

const currentUser = makeVar({})

const postFieldPolicies = {
  creator: {
    merge (existing, incoming) {
      return existing || incoming
    }
  },
  upvotes: {
    merge (_ignored, incoming) {
      return incoming
    }
  },
  downvotes: {
    merge (_ignored, incoming) {
      return incoming
    }
  }
}

const httpLink = createHttpLink({
  uri: GQL_URL,
  credentials: 'same-origin'
})

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: loadToken()
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: loadToken()
    }
  }
})

const mainClient = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache({
    possibleTypes,
    typePolicies: {
      Query: {
        fields: {
          postConnection: relayStylePagination(),
          currentUser: {
            read () {
              return currentUser()
            }
          },
          currentNetID: {
            read () {
              return currentUser().netID
            }
          }
        }
      },
      Subscription: {
        fields: {
          postCreated: {
            merge (_ignored, incoming) {
              return incoming
            }
          },
          postVoteChanged: {
            merge (_ignored, incoming) {
              return incoming
            }
          },
          postRemoved: {
            merge (_ignored, incoming) {
              return incoming
            }
          }
        }
      },
      Discussion: {
        fields: postFieldPolicies
      },
      Event: {
        fields: postFieldPolicies
      },
      Job: {
        fields: postFieldPolicies
      },
      Notice: {
        fields: postFieldPolicies
      }
    }
  })
})

export { mainClient, currentUser }
