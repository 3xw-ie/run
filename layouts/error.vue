<template>
  <div class="__nuxt-error-page">
    <div class="error">
      <!-- eslint-disable-next-line -->
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48"><path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"/></svg>

      <div class="title">{{ message }}</div>
      <div v-if="statusCode === 403">
        <div v-if="accounts">
          <p v-if="accounts.length === 1">Do you want to visit your account instead?</p>
          <p v-if="accounts.length > 1">Do you want to visit one of your accounts instead?</p>
          <a v-for="account in accounts" :key="account.name" :href="accountUrl(account)">{{ account.name }} </a>
        </div>
      </div>
      <p v-if="statusCode === 404" class="description" >
        <nuxt-link class="error-link" to="/">Go back home.</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import userAccounts from '~/apollo/queries/userAccounts'
import { mapGetters } from 'vuex'

export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mounted: false
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || 'messages.client_error'
    },
    ...mapGetters(['user'])
  },
  watch: {
    error(newErr) {
      if (newErr) {
        console.error(newErr)
      }
    }
  },
  created() {
    console.error(this.error)
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    accountUrl(account) {
      const scheme =
        account.domain === 'localhost:3000' ? 'http://' : 'https://'
      return scheme.concat(account.domain, '/')
    }
  },
  apollo: {
    accounts: {
      query: userAccounts,
      variables() {
        return {
          email: this.user.email
        }
      },
      update(data) {
        return data.person.accounts
      }
    }
  }
}
</script>

<style>
.__nuxt-error-page {
  padding: 1rem;
  background: #f7f8fb;
  color: #47494e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.__nuxt-error-page .error {
  max-width: 450px;
}

.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  color: #47494e;
  margin-bottom: 8px;
}

.__nuxt-error-page .description {
  color: #7f828b;
  line-height: 21px;
  margin-bottom: 10px;
}

.__nuxt-error-page a {
  color: #7f828b !important;
  text-decoration: none;
}

.__nuxt-error-page .logo {
  position: fixed;
  left: 12px;
  bottom: 12px;
}
</style>
