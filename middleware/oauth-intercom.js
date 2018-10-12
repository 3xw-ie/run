import axios from 'axios'
import setIntercomToken from '~/apollo/mutations/setIntercomToken'

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
        mutation: setIntercomToken,
        variables: {
          domain: query.state,
          token: response.data.token
        }
      })
      store.commit('setIntercomToken', token)
    })
    .catch(error => console.error(error))

  const url = () => {
    const scheme = query.state === 'localhost:3000' ? 'http://' : 'https://'
    return scheme.concat(query.state, '/settings')
  }

  return redirect(url)
}
