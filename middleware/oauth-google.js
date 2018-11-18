import axios from 'axios'
import updateAccount from '~/apollo/mutations/updateAccount'

export default async function({ query, app, redirect }) {
  await axios({
    url: `${process.env.REST_API_ENDPOINT}/google/oauth/authenticate`,
    method: 'post',
    data: {
      code: query.code
    }
  })
    .then(response => {
      console.log('Response data:', response.data)
      app.apolloProvider.clients.defaultClient.mutate({
        mutation: updateAccount,
        variables: {
          where: {
            domain: query.state
          },
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
