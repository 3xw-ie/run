export const state = () => {
  return {
    account: {},
    dashboards: [],
    page: {},
    user: {}
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user || null
  },
  SET_ACCOUNT(state, account) {
    state.account = {
      id: account.id,
      name: account.name,
      domain: account.domain,
      logo: account.logo ? account.logo.url : null,
      users: account.users,
      eventbriteToken: account.eventbriteToken,
      googleAccessToken: account.googleAccessToken,
      googleRefreshToken: account.googleRefreshToken,
      intercomToken: account.intercomToken,
      sendgridToken: account.sendgridToken,
      stripeToken: account.stripeToken
    }
  },
  SET_DASHBOARDS(state, dashboards) {
    state.dashboards = dashboards || null
  },
  setPageTitle(state, title) {
    state.page.title = title
  },
  setToken(state, provider, token) {
    state.account ? (state.account[`${provider}Token`] = token) : null
  },
  unsetToken(state, provider) {
    state.account ? (state.account[`${provider}Token`] = null) : null
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  isAuthorized(state) {
    if (state.account.users) {
      return state.account.users.some(user => user.email === state.user.email)
    }
    return false
  },
  user(state) {
    return state.user
  },
  account(state) {
    return state.account
  },
  dashboard(state) {
    return state.dashboards ? state.dashboards[0] : null
  },
  metaTitle(state) {
    return state.account.name ? 'Run | ' + state.account.name : 'Run | by 3xW'
  },
  page(state) {
    return state.page
  }
}
