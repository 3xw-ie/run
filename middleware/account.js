import account from '~/apollo/queries/account'

export default async function({ isServer, req, app, store }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) return

  const host = req.headers.host

  await app.apolloProvider.clients.defaultClient
    .query({
      query: account,
      variables: {
        domain: host
      }
    })
    .then(response => store.commit('SET_ACCOUNT', response.data.account))
  // .catch(error => store.commit('', error.toString()))

  store.commit('test', host)
}
