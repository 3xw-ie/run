import { setSecret } from './auth'

import uuid from 'uuid'

const getLock = options => {
  const config = require('~/config.json')
  const Auth0Lock = require('auth0-lock').default
  return new Auth0Lock(
    config.AUTH0_CLIENT_ID,
    config.AUTH0_CLIENT_DOMAIN,
    options
  )
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const getOptions = options => {
  const secret = uuid.v4()
  setSecret(secret)
  return {
    auth: {
      responseType: 'token id_token',
      redirectUrl: `${getBaseUrl()}/auth`,
      params: {
        scope: 'openid profile email',
        state: secret
      }
    },
    closable: false,
    ...options
  }
}

export const showLogin = options => getLock(getOptions(options)).show()
export const logout = () => getLock().logout({ returnTo: getBaseUrl() })
