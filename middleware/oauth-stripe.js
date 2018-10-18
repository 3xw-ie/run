import axios from 'axios'
import setToken from '~/apollo/mutations/setToken'

export default async function({ query, app, redirect }) {
  await axios({
    url: 'https://connect.stripe.com/oauth/token',
    method: 'post',
    data: {
      code: query.code,
      client_secret: 'sk_live_VrqimqBX6rGmvGIWlkd7FXW3',
      grant_type: 'authorization_code'
    }
  })
    .then(response => {
      app.apolloProvider.clients.defaultClient.mutate({
        mutation: setToken,
        variables: {
          domain: query.state,
          data: {
            stripeToken: response.data.access_token
          }
        }
      })
    })
    .catch(error => console.error(error))

  const scheme = query.state === 'localhost:3000' ? 'http://' : 'https://'
  const url = scheme.concat(query.state, '/integrations')

  return redirect(url)
}
