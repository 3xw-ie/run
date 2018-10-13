<template>
  <div class="bg-white shadow-md p-4">
    <h3>{{ card.title }}</h3>
    <template v-if="card.type === 'links'">
      <a
        v-for="link in card.links"
        :key="link.url"
        :href="link.url"
        class="block my-2"
        v-text="link.text"
      />
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
      <table v-if="!loading">
        <tbody>
          <tr v-for="segment in data" :key="segment.name">
            <td class="pr-4 capitalize">{{ segment.name }}</td>
            <td>{{ segment.count }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="card.type === 'intercom.counts'">
      <table v-if="!loading">
        <tbody>
          <tr v-for="count in data" :key="count.name">
            <td class="pr-4 capitalize">{{ count.name }}</td>
            <td>{{ count.count }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="card.type === 'stripe.balance'">
      <p>Balance: {{ data.available[0].amount }}</p>
    </template>
    <p v-if="status === 'success'" class="text-green" v-text="'Success! 🎉'"/>
    <p v-if="status === 'error'" class="text-red" v-text="'Something went wrong.'"/>
    <p v-if="loading">Loading...</p>
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
      loading: false
    }
  },
  computed: {
    ...mapGetters(['dashboard', 'intercomToken', 'stripeToken'])
  },
  mounted() {
    if (this.card.type === 'intercom.counts.user.segment') {
      this.getIntercomUserSegmentCount(this.card.segments)
    }
    if (this.card.type === 'intercom.counts') {
      this.getIntercomAppCounts(this.card.counts)
    }
    if (this.card.type === 'stripe.balance') {
      this.getStripeBalance()
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
    updateStatus(status) {
      this.status = status
    },
    async getIntercomAppCounts(counts) {
      this.loading = true
      await this.$axios({
        url: `https://api.3xw.app/intercom/${this.intercomToken}/counts`,
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
        url: `https://api.3xw.app/intercom/${this.intercomToken}/counts?type=user&count=segment`, // eslint-disable-line
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
      this.$axios.setToken('Bearer ' + this.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/balance'
      })
        .then(response => {
          this.loading = false
          console.log(response)
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
