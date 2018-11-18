<template>
  <main>
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        <h2 class="mb-4">Integrations</h2>
        <h3 class="my-2">
          <nuxt-link to="/intercom" class="text-blue no-underline">Intercom</nuxt-link>
        </h3>
        <div class="sm:flex sm:justify-between sm:items-center">
          <p class="flex-1 mb-2 sm:mb-0">Intercom is the world’s first customer platform helping internet businesses accelerate growth.</p>
          <div class="w-40 flex justify-end">
            <button v-if="account.intercomToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntegration('intercom')">
              Remove
            </button>
            <a v-else :href="`https://app.intercom.io/oauth?client_id=${env.INTERCOM_CLIENT_ID}&state=${account.domain}`">
              <img src="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png" srcset="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png 1x, https://static.intercomassets.com/assets/oauth/primary@2x-0d69ca2141dfdfa0535634610be80994.png 2x, https://static.intercomassets.com/assets/oauth/primary@3x-788ed3c44d63a6aec3927285e920f542.png 3x">
            </a>
          </div>
        </div>
        <hr class="my-4 -mx-4 border">
        <h3 class="my-2">
          <nuxt-link to="/stripe" class="text-blue no-underline">Stripe</nuxt-link>
        </h3>
        <div class="sm:flex sm:justify-between sm:items-center">
          <p class="sm:flex-1  mb-2 sm:mb-0">Stripe is the best way to accept payments online. Stripe aims to expand internet commerce by making it easy to process transactions and manage an online business.</p>
          <div class="w-40 flex justify-end">
            <button v-if="account.stripeToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntegration('stripe')">
              Remove
            </button>
            <a v-else :href="`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${env.STRIPE_CLIENT_ID}B&scope=read_write&state=${account.domain}`">
              <img src="/img/stripe-connect-button.png" srcset="/img/stripe-connect-button.png 1x, /img/stripe-connect-button@2x.png 2x, /img/stripe-connect-button@3x.png 3x" alt="Connect with Stripe" class="h-full w-full">
            </a>
          </div>
        </div>
        <hr class="my-4 -mx-4 border">
        <h3 class="my-2">
          <nuxt-link to="/google" class="text-blue no-underline">Google</nuxt-link>
        </h3>
        <div class="sm:flex sm:justify-between sm:items-center">
          <p class="sm:flex-1  mb-2 sm:mb-0">This integration lets you access Google Analytics to view your website traffic.</p>
          <div class="w-40 flex justify-end">
            <button v-if="account.googleRefreshToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntegration('google')">
              Remove
            </button>
            <a v-else :href="`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https://www.googleapis.com/auth/analytics.readonly&response_type=code&client_id=${env.GOOGLE_CLIENT_ID}&redirect_uri=${env.APP_DOMAIN}/oauth/google&state=${account.domain}&prompt=consent`">
              <img src="/img/google-sign-in-button.png" srcset="/img/google-sign-in-button.png 1x, /img/google-sign-in-button@2x.png 2x" alt="Sign in with Google" class="h-full w-full">
            </a>
          </div>
        </div>
        <hr class="my-4 -mx-4 border">
        <h3 class="my-2">
          <nuxt-link to="/sendgrid" class="text-blue no-underline">Sendgrid</nuxt-link>
        </h3>
        <div class="sm:flex sm:justify-between sm:items-center">
          <p class="sm:flex-1  mb-2 sm:mb-0">This integration lets you send emails with Sendgrid and get metrics on your previously sent emails.</p>
          <div class="w-40 flex justify-end">
            <button v-if="account.sendgridToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntegration('sendgrid')">
              Remove
            </button>
            <button v-else class="px-3 py-2 rounded ml-4 bg-blue text-white" @click.prevent="$openModal('provideSendgridToken')">
              Add Sendgrid
            </button>
          </div>
          <Modal ref="provideSendgridToken" title="Sendgrid API Key">
            <form class="flex items-center mb-4">
              <label for="sendgridToken" class="mr-2">API Key:</label>
              <input v-model="sendgridToken" name="sendgridToken" class="flex-1 p-2 rounded bg-grey-lighter">
              <button :style="`background-color: ${dashboard.primaryColor}`" type="submit" class="px-3 py-2 rounded ml-2 bg-blue text-white" @click.prevent="addIntegration('sendgrid', sendgridToken); $closeModal('provideSendgridToken')">
                Submit
              </button>
            </form>
            <a href="https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key" target="_blank" class="text-blue no-underline">Learn how to get a Sendgrid API key.</a>
          </Modal>
        </div>
        <hr class="my-4 -mx-4 border">
        <h3 class="my-2">
          <nuxt-link to="/eventbrite" class="text-blue no-underline">Eventbrite</nuxt-link>
        </h3>
        <div class="sm:flex sm:justify-between sm:items-center">
          <p class="sm:flex-1  mb-2 sm:mb-0">This integration lets you pull in your events from Eventbrite.</p>
          <div class="w-40 flex justify-end">
            <button v-if="account.eventbriteToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntegration('eventbrite')">
              Remove
            </button>
            <a v-else :href="`https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${env.EVENTBRITE_CLIENT_ID}&state=${account.domain}`" class="px-3 py-2 rounded ml-4 bg-blue text-white no-underline">
              Add Eventbrite
            </a>
          </div>
        </div>
      </Card>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import updateAccount from '~/apollo/mutations/updateAccount'
import Card from '~/components/Card'
import Modal from '~/components/Modal'

export default {
  layout: 'dashboard',
  components: {
    Card,
    Modal
  },
  data() {
    return {
      sendgridModal: {
        visible: false
      },
      sendgridToken: null
    }
  },
  computed: {
    env() {
      return {
        APP_DOMAIN: process.env.APP_DOMAIN,
        EVENTBRITE_CLIENT_ID: process.env.EVENTBRITE_CLIENT_ID,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        INTERCOM_CLIENT_ID: process.env.INTERCOM_CLIENT_ID,
        STRIPE_CLIENT_ID: process.env.STRIPE_CLIENT_ID
      }
    },
    ...mapGetters(['account', 'dashboard'])
  },
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Integrations')
  },
  methods: {
    addIntegration(provider, token) {
      this.$apollo
        .mutate({
          mutation: updateAccount,
          variables: {
            where: {
              id: this.account.id
            },
            data: {
              [`${provider}Token`]: token
            }
          }
        })
        .then(response => {
          this.$store.commit('setToken', provider, token)
          window.location.reload()
        })
        .catch(error => console.error(error))
    },
    removeIntegration(provider) {
      let data
      if (provider === 'google') {
        data = {
          googleAccessToken: null,
          googleRefreshToken: null
        }
      } else {
        data = {
          [`${provider}Token`]: null
        }
      }
      this.$apollo
        .mutate({
          mutation: updateAccount,
          variables: {
            where: {
              id: this.account.id
            },
            data
          }
        })
        .then(response => this.$store.commit('unsetToken', provider))
        .catch(error => console.error(error))
    },
    getURLScheme(domain) {
      return domain === 'localhost:3000' ? 'http://' : 'https://'
    }
  }
}
</script>
