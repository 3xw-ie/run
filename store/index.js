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
    state.account = account || null
  },
  test(state, test) {
    state.test = test || null
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  },
  account(state) {
    return state.account
  },
  dashboard(state) {
    return state.account.dashboard
  },
  test(state) {
    return state.test
  }
}
