import axios from 'axios'
import updateAccount from '~/apollo/mutations/updateAccount'

export default async function({ query, app, redirect }) {
  await axios({
    url: 'https://connect.stripe.com/oauth/token',
    method: 'post',
    data: {
      code: query.code,
      client_secret: process.env.STRIPE_CLIENT_SECRET,
      grant_type: 'authorization_code'
    }
  })
    .then(response => {
      console.log(response)
      app.apolloProvider.clients.defaultClient.mutate({
        mutation: updateAccount,
        variables: {
          where: {
            domain: query.state
          },
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
