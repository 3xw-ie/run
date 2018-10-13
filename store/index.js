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
      name: account.name,
      domain: account.domain,
      logo: account.logo ? account.logo.url : null,
      users: account.users,
      intercomToken: account.intercomToken,
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
    return state.account.users.some(user => user.email === state.user.email)
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
  },
  intercomToken(state) {
    return state.account.intercomToken
  },
  stripeToken(state) {
    return state.account.stripeToken
  }
}
