import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHCMS_API =
  'https://api-euwest.graphcms.com/v1/cjn27kexr0gur01ghlh2wb6q8/master'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiNDYwM2ZkMzgtOTE1Mi00NjQ0LWFjYzgtMGE3NDc0Y2M1NjhmIn0.5C0zU8XwqBQTAU27ilHw07WqbUh48399YsNLEhJ6suU'

const httpLink = createHttpLink({
  uri: GRAPHCMS_API
})

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

export default () => ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
