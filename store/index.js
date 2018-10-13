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
      intercomToken: account.intercomToken
    }
  },
  SET_DASHBOARDS(state, dashboards) {
    state.dashboards = dashboards || null
  },
  setPageTitle(state, title) {
    state.page.title = title
  },
  setIntercomToken(state, token) {
    state.account ? (state.account.intercomToken = token) : null
  },
  unsetIntercomToken(state) {
    state.account ? (state.account.intercomToken = null) : null
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
  }
}
