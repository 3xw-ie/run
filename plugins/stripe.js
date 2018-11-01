import status from '~/plugins/status'
import { mapGetters } from 'vuex'
import queryString from 'query-string'

const stripe = {
  mixins: [status],
  data() {
    return {
      charges: [],
      customers: []
    }
  },
  computed: {
    stripeConfig() {
      return {
        baseURL: 'https://api.stripe.com/v1',
        headers: {
          Authorization: `Bearer ${this.account.stripeToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    },
    ...mapGetters(['account'])
  },
  methods: {
    async getStripeCharges(limit = 50) {
      this.updateStatus('loading')
      await this.$axios({
        url: `/charges?limit=${limit}`,
        ...this.stripeConfig
      })
        .then(response => {
          this.charges = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async updateStripeCharge(charge, data) {
      this.updateStatus('loading')
      await this.$axios({
        url: `/charges/${charge.id}`,
        method: 'post',
        data,
        ...this.stripeConfig
      })
        .then(response => {
          this.charges.data.splice(
            this.findChargeIndex(charge.id),
            1,
            response.data
          )
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async getStripeCustomers(limit = 50) {
      this.updateStatus('loading')
      await this.$axios({
        url: `/customers?limit=${limit}`,
        ...this.stripeConfig
      })
        .then(response => {
          this.customers = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async createStripeCustomer() {
      this.updateStatus('loading')
      await this.$axios({
        url: '/customers',
        method: 'post',
        data: queryString.stringify(this.customer),
        ...this.stripeConfig
      })
        .then(response => {
          this.customers.data.push(response.data)
          this.customer = {
            email: null,
            description: null
          }
          this.updateStatus('success')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async getStripeBalance() {
      this.updateStatus('loading')
      await this.$axios({
        url: '/balance'
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
    findCharge(id) {
      return this.charges.data.find(charge => charge.id === id)
    },
    findChargeIndex(id) {
      return this.charges.data.findIndex(charge => charge.id === id)
    },
    findCustomer(id) {
      return this.customers.data.find(customer => customer.id === id)
    },
    findCustomerIndex(id) {
      return this.customers.data.findIndex(customer => customer.id === id)
    },
    linkCustomer(charge, customer) {
      this.updateStripeCharge(charge, queryString.stringify({ customer }))
    },
    sendReceipt(charge) {
      charge.receipt_email = this.findCustomer(charge.customer).email
      this.updateStripeCharge(
        charge,
        queryString.stringify({
          receipt_email: charge.receipt_email
        })
      )
    }
  }
}

export default stripe
