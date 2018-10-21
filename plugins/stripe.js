import { mapGetters } from 'vuex'

const stripe = {
  data() {
    return {
      charges: [],
      customers: []
    }
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    async getStripeCharges(limit = 50) {
      this.loading = true
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: `https://api.stripe.com/v1/charges?limit=${limit}`
      })
        .then(response => {
          this.loading = false
          this.charges = response.data
        })
        .catch(error => {
          this.loading = false
          console.error(error)
        })
    },
    async updateStripeCharge(charge, data) {
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: `https://api.stripe.com/v1/charges/${charge.id}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
      })
        .then(response => {
          this.charges.data.splice(
            this.findChargeIndex(charge.id),
            1,
            response.data
          )
        })
        .catch(error => {
          console.error(error)
        })
    },
    async getStripeCustomers(limit = 50) {
      this.loading = true
      this.$axios.setToken(`Bearer ${this.account.stripeToken}`)
      await this.$axios({
        url: `https://api.stripe.com/v1/customers?limit=${limit}`
      })
        .then(response => {
          this.loading = false
          this.customers = response.data
        })
        .catch(error => {
          this.loading = false
          console.error(error)
        })
    },
    async createStripeCustomer() {
      this.$axios.setToken(`Bearer ${this.account.stripeToken}`)
      await this.$axios({
        url: 'https://api.stripe.com/v1/customers',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: queryString.stringify(this.customer)
      })
        .then(response => {
          this.customers.data.push(response.data)
          this.customer = {
            email: null,
            description: null
          }
        })
        .catch(error => {
          console.error(error)
        })
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
    findCharge(id) {
      return this.charges.data.findIndex(charge => charge.id === id)
    },
    findChargeIndex(id) {
      return this.charges.data.find(charge => charge.id === id)
    },
    findCustomer(id) {
      return this.customers.data.find(customer => customer.id === id)
    },
    findCustomerIndex(id) {
      return this.customers.data.findIndex(customer => customer.id === id)
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
