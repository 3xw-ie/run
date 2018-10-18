import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHCMS_API =
  'https://api-euwest.graphcms.com/v1/cjn27kexr0gur01ghlh2wb6q8/master'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiNTVjOWJlOGUtMWYyMy00YjBkLTliYWEtNmNkOTRkNTRmYzRlIn0.a_xot1QbL5k_C-8WlH8NAB0GQe-gvhy2NnViARt_jMo'

export default () => ({
  httpEndpoint: GRAPHCMS_API,
  getAuth: () => `Bearer ${token}`,
  cache: new InMemoryCache()
})
