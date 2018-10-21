import status from '~/plugins/status'
import { mapGetters } from 'vuex'

const google = {
  mixins: [status],
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    async getGoogleAnalyticsData(viewId, range, expression) {
      this.updateStatus('loading')
      this.$axios.setToken(`Bearer ${this.account.googleToken}`)
      await this.$axios({
        url: 'https://analyticsreporting.googleapis.com/v4/reports:batchGet',
        method: 'post',
        data: {
          reportRequests: [
            {
              viewId,
              dateRanges: [
                {
                  startDate: range.startDate,
                  endDate: range.endDate
                }
              ],
              metrics: [
                {
                  expression
                }
              ]
            }
          ]
        }
      })
        .then(response => {
          this.data = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus(
            'error',
            'Please try removing the Google integration and signing in with Google again.'
          )
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
