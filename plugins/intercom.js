import status from '~/plugins/status'
import { mapGetters } from 'vuex'

const intercom = {
  mixins: [status],
  data() {
    return {
      counts: [],
      segments: [],
      users: {},
      leads: {}
    }
  },
  computed: {
    intercomConfig() {
      return {
        baseURL: `https://api.3xw.app/intercom/${this.account.intercomToken}`
      }
    },
    ...mapGetters(['account'])
  },
  methods: {
    async getIntercomAppCounts(counts) {
      this.updateStatus('loading')
      await this.$axios({
        url: '/counts',
        ...this.intercomConfig
      })
        .then(response => {
          this.counts = this.prepareIntercomCounts(response.data)
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    prepareIntercomCounts(counts) {
      let output = []

      if (this.block.counts) {
        this.block.counts.forEach(wanted => {
          const match = Object.keys(counts).find(count => count === wanted)
          output.push({
            name: match + 's',
            count: counts[match].count
          })
        })
      } else {
        counts.forEach(count => {
          output.push({
            name: Object.keys(count)[0] + 's',
            count: count[Object.keys(count)]
          })
        })
      }
      return output
    },
    async getIntercomUserSegmentCount(segments) {
      this.updateStatus('loading')
      await this.$axios({
        url: '/counts?type=user&count=segment',
        ...this.intercomConfig
      })
        .then(response => {
          this.segments = this.prepareIntercomSegments(
            response.data.user.segment
          )
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    prepareIntercomSegments(segments) {
      let output = []

      if (this.block.segments) {
        this.block.segments.forEach(wanted => {
          const segment = segments.find(
            segment => Object.keys(segment)[0] === wanted
          )
          output.push({
            name: wanted,
            count: segment ? segment[Object.keys(segment)] : 0
          })
        })
      } else {
        segments.forEach(segment => {
          output.push({
            name: Object.keys(segment)[0],
            count: segment[Object.keys(segment)]
          })
        })
      }
      return output
    },
    async getIntercomUsers() {
      this.updateStatus('loading')
      await this.$axios({
        url: '/users',
        ...this.intercomConfig
      })
        .then(response => {
          this.users = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async getIntercomLeads({ email }) {
      this.updateStatus('loading')
      await this.$axios({
        url: `/contacts${email ? '?email' : ''}`,
        ...this.intercomConfig
      })
        .then(response => {
          this.leads = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    }
  }
}

export default intercom
