import axios from 'axios'
import setToken from '~/apollo/mutations/setToken'

export default async function({ query, app, store, redirect }) {
  await axios({
    url: 'https://api.intercom.io/auth/eagle/token',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      code: query.code,
      client_id: '15329d68-6aaf-47ab-84ad-09d8d73f97be',
      client_secret: '2b8eea09-0c43-4d9c-9b9b-7b2961cd41c2'
    }
  })
    .then(response => {
      app.apolloProvider.clients.defaultClient.mutate({
        mutation: setToken,
        variables: {
          domain: query.state,
          data: {
            intercomToken: response.data.token
          }
        }
      })
    })
    .catch(error => console.error(error))

  const scheme = query.state === 'localhost:3000' ? 'http://' : 'https://'
  const url = scheme.concat(query.state, '/integrations')

  return redirect(url)
}
