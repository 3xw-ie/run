import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHCMS_API =
  'https://api-euwest.graphcms.com/v1/cjn27kexr0gur01ghlh2wb6q8/master'

export default () => ({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
})
