import status from '~/plugins/status'
import { mapGetters } from 'vuex'

const google = {
  mixins: [status],
  computed: {
    googleConfig() {
      return {
        baseURL: `${process.env.REST_API_ENDPOINT}/google`,
        headers: {
          Authorization: `Bearer ${this.account.id}`
        }
      }
    },
    ...mapGetters(['account'])
  },
  methods: {
    async getGoogleAnalyticsData(viewId, range, expression) {
      this.updateStatus('loading')
      await this.$axios({
        url: `/analytics/batchGet`,
        method: 'post',
        data: {
          viewId,
          range,
          expression
        },
        ...this.googleConfig
      })
        .then(response => {
          this.data = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    updateGoogleAnalyticsData() {
      setTimeout(() => {
        this.getGoogleAnalyticsData(
          this.block.view_ids,
          {
            startDate: this.google.analytics.range.startDate,
            endDate: this.google.analytics.range.endDate
          },
          this.google.analytics.expression
        )
      }, 1)
    }
  }
}

export default google
