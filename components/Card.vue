<template>
  <div :class="[card.width ? `columns-${card.width}` : '', card.height ? `rows-${card.height}` : '']" class="rounded bg-white shadow-md p-4">
    <h3 v-if="card.title" class="mb-2">{{ card.title }}</h3>
    <template v-if="card.type === 'links'">
      <div class="flex flex-wrap">
        <a
          v-for="link in card.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          class="w-1/2 block leading-normal text-blue no-underline"
        >
          {{ link.text }}
        </a>
      </div>
    </template>
    <template v-if="card.type === 'button'">
      <button
        :style="'background-color:' + dashboard.primaryColor"
        type="submit"
        class="px-3 py-2 rounded my-4 text-white"
        @click.prevent="handleButtonClick()"
        v-text="card.button.text"
      />
    </template>
    <template v-if="card.type === 'intercom.counts.user.segment'">
      <div v-if="!loading && true" class="flex mt-4">
        <div v-for="(count, index) in data" :key="count.name" :class="[`w-1/${data.length}`, + index !== data.length - 1 ? 'border-r-2' : '']" class="flex flex-col p-4 text-center">
          <h1>{{ count.count }}</h1>
          <p class="flex-1 flex justify-center items-center">{{ count.name }}</p>
        </div>
      </div>
      <table v-else>
        <tbody>
          <tr v-for="segment in data" :key="segment.name">
            <td class="pr-4 capitalize">{{ segment.name }}</td>
            <td>{{ segment.count }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="card.type === 'intercom.counts'">
      <div v-if="!loading && true" class="flex mt-4">
        <div v-for="(count, index) in data" :key="count.name" :class="[`w-1/${data.length}`, + index !== data.length - 1 ? 'border-r-2' : '']" class="flex flex-col p-4 text-center">
          <h1>{{ count.count }}</h1>
          <p class="flex-1 flex justify-center items-center capitalize">{{ count.name }}</p>
        </div>
      </div>
      <table v-else>
        <tbody>
          <tr v-for="count in data" :key="count.name">
            <td class="pr-4 capitalize">{{ count.name }}</td>
            <td>{{ count.count }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="card.type === 'stripe.balance'">
      <p v-if="data">Balance: {{ data.available[0].amount }}</p>
    </template>
    <template v-if="card.type === 'stripe.charges'">
      <ul v-if="!loading && data" class="list-reset mb-2">
        <li v-for="charge in data.data" :key="charge.id">
          <span class="font-semibold text-grey-darkest leading-tight">€{{ charge.amount / 100 }}</span> charged <span class="italic"> {{ charge.created | moment('from', 'now') }}</span>.
        </li>
      </ul>
      <nuxt-link to="/stripe/charges" class="text-blue no-underline">See all &rarr;</nuxt-link>
    </template>
    <template v-if="card.type === 'stripe.customers'">
      <ul v-if="!loading && data" class="list-reset mb-2">
        <li v-for="customer in data.data" :key="customer.id">
          <span class="leading-tight">{{ customer.email }}</span>
        </li>
      </ul>
      <nuxt-link to="/stripe/customers" class="text-blue no-underline">See all &rarr;</nuxt-link>
    </template>
    <template v-if="card.type === 'google.analytics'">
      <div class="flex flex-col text-center mt-4">
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
      </div>
    </template>
    <p v-if="status === 'success'" class="text-green" v-text="statusMessage ? statusMessage : 'Success! 🎉'"/>
    <p v-if="status === 'error'" class="text-red" v-text="statusMessage ? statusMessage : 'Something went wrong.'"/>
    <slot/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      data: null,
      status: null,
      statusMessage: null,
      loading: true,
      google: {
        analytics: {
          range: {
            startDate: null,
            endDate: null
          },
          expression: null
        }
      }
    }
  },
  computed: {
    ...mapGetters(['account', 'dashboard'])
  },
  mounted() {
    if (this.card.type === 'google.analytics') {
      this.google.analytics = {
        range: {
          startDate: '7DaysAgo',
          endDate: 'today'
        },
        expression: 'ga:sessions'
      }
      this.data = {
        reports: [
          {
            data: {
              totals: [
                {
                  values: [0]
                }
              ]
            }
          }
        ]
      }
      this.updateGoogleAnalyticsData()
    }
    if (this.card.type === 'intercom.counts.user.segment') {
      this.getIntercomUserSegmentCount(this.card.segments)
    }
    if (this.card.type === 'intercom.counts') {
      this.getIntercomAppCounts(this.card.counts)
    }
    if (this.card.type === 'stripe.balance') {
      this.getStripeBalance()
    }
    if (this.card.type === 'stripe.charges') {
      this.getStripeCharges()
    }
    if (this.card.type === 'stripe.customers') {
      this.getStripeCustomers()
    }
  },
  methods: {
    async handleButtonClick() {
      this.loading = true
      const button = this.card.button
      await this.$axios({
        url: button.url,
        method: button.action,
        data: button.payload
      })
        .then(response => {
          this.loading = false
          console.log(response)
          response.status <= 400
            ? this.updateStatus('success')
            : this.updateStatus('error')
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    },
    updateStatus(status, message) {
      this.status = status
      this.statusMessage = message
    },
    async getGoogleAnalyticsData(viewId, range, expression) {
      this.loading = true
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
          this.loading = false
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
          this.card.view_ids,
          {
            startDate: this.google.analytics.range.startDate,
            endDate: this.google.analytics.range.endDate
          },
          this.google.analytics.expression
        )
      }, 1)
    },
    async getIntercomAppCounts(counts) {
      this.loading = true
      await this.$axios({
        url: `https://api.3xw.app/intercom/${
          this.account.intercomToken
        }/counts`,
        method: 'get'
      })
        .then(response => {
          this.data = this.prepareCounts(response.data)
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    },
    prepareCounts(counts) {
      let output = []

      if (this.card.counts) {
        this.card.counts.forEach(wanted => {
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
      this.loading = true
      await this.$axios({
        url: `https://api.3xw.app/intercom/${this.account.intercomToken}/counts?type=user&count=segment`, // eslint-disable-line
        method: 'get'
      })
        .then(response => {
          this.data = this.prepareSegments(response.data.user.segment)
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    },
    prepareSegments(segments) {
      let output = []

      if (this.card.segments) {
        this.card.segments.forEach(wanted => {
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
    async getStripeBalance() {
      this.loading = true
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/balance'
      })
        .then(response => {
          this.loading = false
          this.data = response.data
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    },
    async getStripeCharges() {
      this.loading = true
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/charges?limit=5'
      })
        .then(response => {
          this.loading = false
          this.data = response.data
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    },
    async getStripeCustomers() {
      this.loading = true
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/customers?limit=5'
      })
        .then(response => {
          this.loading = false
          this.data = response.data
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    }
  }
}
</script>
