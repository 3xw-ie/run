import status from '~/plugins/status'
import { mapGetters } from 'vuex'

const google = {
  mixins: [status],
  computed: {
    googleConfig() {
      return {
        headers: {
          Authorization: `Bearer ${this.account.googleAccessToken}`
        }
      }
    },
    ...mapGetters(['account'])
  },
  methods: {
    async getGoogleAnalyticsData(viewId, range, expression) {
      this.updateStatus('loading')
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
        },
        ...this.googleConfig
      })
        .then(response => {
          this.data = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
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
