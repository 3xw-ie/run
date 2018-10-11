export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user || null
  },
  SET_ACCOUNT(state, account) {
    state.account = {
      name: account.name,
      logo: account.logo ? account.logo.url : null,
      users: account.users
    }
  },
  SET_DASHBOARDS(state, dashboards) {
    state.dashboards = dashboards || null
  },
  test(state, test) {
    state.test = test || null
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
    return state.dashboards[0]
  },
  test(state) {
    return state.test
  }
}
