export default function({ store, redirect, error }) {
  if (store.getters.isAuthorized) return

  return error({
    statusCode: 403,
    message: 'Sorry, you are not authorized to view this account.'
  })
}
