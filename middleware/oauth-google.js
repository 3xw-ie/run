import axios from 'axios'
import setToken from '~/apollo/mutations/setToken'

export default async function({ query, app, redirect }) {
  await axios({
    url: 'https://api.3xw.app/rest/google/oauth/authenticate',
    method: 'post',
    data: {
      code: query.code
    }
  })
    .then(response => {
      console.log('Response data:', response.data)
      app.apolloProvider.clients.defaultClient.mutate({
        mutation: setToken,
        variables: {
          domain: query.state,
          data: {
            googleAccessToken: response.data.access_token,
            googleRefreshToken: response.data.refresh_token
          }
        }
      })
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => console.error(error))

  const scheme = query.state === 'localhost:3000' ? 'http://' : 'https://'
  const url = scheme.concat(query.state, '/integrations')

  return redirect(url)
}
