<template>
  <figure class="flex flex-col text-center mt-4">
    <h1 v-if="data" class="mb-4">{{ loading ? '🤔' : data.reports[0].data.totals[0].values[0] }}</h1>
    <form class="mb-2">
      <select v-model="google.analytics.expression" @input="updateGoogleAnalyticsData()">
        <option value="ga:sessions">Sessions</option>
        <option value="ga:users">Users</option>
        <option value="ga:pageviews">Page views</option>
      </select>
      in the last
      <select v-model="google.analytics.range.startDate" @input="updateGoogleAnalyticsData()">
        <option value="7DaysAgo">7 Days</option>
        <option value="30DaysAgo">30 Days</option>
      </select>
    </form>
  </figure>
</template>

<script>
import status from '~/plugins/status'
import google from '~/plugins/google'

export default {
  mixins: [status, google],
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      google: {
        analytics: {
          range: {
            startDate: '7DaysAgo',
            endDate: 'today'
          },
          expression: 'ga:sessions'
        }
      },
      data: {
        reports: [
          {
            data: {
              totals: [
                {
                  values: ['🤔']
                }
              ]
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.updateGoogleAnalyticsData()
  }
}
</script>
