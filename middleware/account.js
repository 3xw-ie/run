import account from '~/apollo/queries/account'
import { getHostName } from '~/utils/hostname'

export default async function({ isServer, req, app, store }) {
  if (isServer || !req) return

  const referrer = req.headers.referrer
  const host = referrer ? getHostName(referrer) : req.headers.host

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
