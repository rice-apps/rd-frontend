import { ApolloClient } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import { createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'

import {
  getMainDefinition,
  relayStylePagination
} from '@apollo/client/utilities'
import possibleTypes from './possibleTypes.json'

import { GQL_URL, WS_URL, loadToken } from '../config'

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
  cache: new InMemoryCache({
    possibleTypes,
    typePolicies: {
      Query: {
        fields: {
          postConnection: relayStylePagination()
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
        fields: {
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
      },
      Event: {
        creator: {
          merge (existing, _ignored) {
            return existing
          }
        },
        fields: {
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
      },
      Job: {
        fields: {
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
      },
      Notice: {
        fields: {
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
      }
    }
  }),
  link: authLink.concat(splitLink)
})

export default mainClient
