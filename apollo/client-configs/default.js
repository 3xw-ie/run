import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHCMS_API =
  'https://api-euwest.graphcms.com/v1/cjn27kexr0gur01ghlh2wb6q8/master'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiNDYwM2ZkMzgtOTE1Mi00NjQ0LWFjYzgtMGE3NDc0Y2M1NjhmIn0.5C0zU8XwqBQTAU27ilHw07WqbUh48399YsNLEhJ6suU'

export default () => ({
  httpEndpoint: GRAPHCMS_API,
  getAuth: () => `Bearer ${token}`,
  cache: new InMemoryCache()
})
