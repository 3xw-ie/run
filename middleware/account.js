import account from '~/apollo/queries/account'
import { getHostName } from '~/utils/hostname'

export default async function({ isServer, req, app, store }) {
  if (isServer || !req) return

  const forwarded = req.headers['x-forwarded-host']
  const host = forwarded ? forwarded : req.headers.host

  await app.apolloProvider.clients.defaultClient
    .query({
      query: account,
      variables: {
        domain: host
      }
    })
    .then(response => {
      store.commit('SET_ACCOUNT', response.data.account)
      store.commit('SET_DASHBOARDS', response.data.account.dashboards)
    })
    .catch(error => console.log(error))

  store.commit('test', host)
}
