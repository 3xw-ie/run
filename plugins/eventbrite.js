import status from '~/plugins/status'
import { mapGetters } from 'vuex'

const stripe = {
  mixins: [status],
  data() {
    return {
      events: [],
      user: {}
    }
  },
  computed: {
    eventbriteConfig() {
      return {
        baseURL: 'https://www.eventbriteapi.com/v3',
        headers: {
          Authorization: `Bearer ${this.account.eventbriteToken}`,
          'Content-Type': 'application/json'
        }
      }
    },
    ...mapGetters(['account'])
  },
  methods: {
    async getEventbriteUser(id = 'me') {
      this.updateStatus('loading')
      return await this.$axios({
        url: `/users/${id}/`,
        ...this.eventbriteConfig
      })
        .then(response => {
          this.updateStatus('ready')
          return response.data
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async getEventbriteUserEvents(id = 'me') {
      this.updateStatus('loading')
      return await this.$axios({
        url: `/users/${id}/owned_events/`,
        ...this.eventbriteConfig
      })
        .then(response => {
          this.updateStatus('ready')
          return response.data
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    }
  }
}

export default stripe
