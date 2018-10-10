import account from '~/apollo/queries/account'
import { getHostName } from '~/utils/hostname'

export default async function({ isServer, req, app, store }) {
  if (isServer || !req) return

  const referer = req.headers.referer
  const host = referer ? getHostName(referer) : req.headers.host

  await app.apolloProvider.clients.defaultClient
    .query({
      query: account,
      variables: {
        domain: host
      }
    })
    .then(response => store.commit('SET_ACCOUNT', response.data.account))
    .catch(error => console.log(error))

  store.commit('test', host)
}
