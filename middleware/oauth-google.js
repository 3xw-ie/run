import axios from 'axios'
import setToken from '~/apollo/mutations/setToken'

export default async function({ route, query, app, redirect }) {
  await axios({
    url: 'http://postb.in/poy5oC1I',
    method: 'post',
    data: route.fullPath
  })
  app.apolloProvider.clients.defaultClient
    .mutate({
      mutation: setToken,
      variables: {
        domain: Object.keys(query).state,
        data: {
          googleToken: response.data.access_token
        }
      }
    })
    .catch(error => console.error(error))

  const scheme = query.state === 'localhost:3000' ? 'http://' : 'https://'
  const url = scheme.concat(query.state, '/integrations')

  // return redirect(url)
}
