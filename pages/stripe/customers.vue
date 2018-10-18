<template>
  <main>
    <section class="container mx-auto">
      <nuxt-link to="/stripe" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Stripe</nuxt-link>
      <Card class="overflow-x-scroll">
        <h1 class="mb-4">Customers</h1>
        <table v-if="!loading && customers">
          <thead class="text-left">
            <tr>
              <th>Email</th>
              <th>Description</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers.data" :key="customer.id" class="h-10">
              <td class="pr-8">
                {{ customer.email }}
              </td>
              <td class="pr-8">{{ customer.description }}</td>
              <td class="pr-8">{{ customer.created | moment('Do MMM YYYY') }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Loading...</p>
      </Card>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card'
import Modal from '~/components/Modal'

export default {
  layout: 'dashboard',
  components: {
    Card,
    Modal
  },
  data() {
    return {
      loading: false,
      charges: null
    }
  },
  computed: mapGetters(['account', 'dashboard']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Stripe Customers')
  },
  mounted() {
    this.getStripeCustomers()
  },
  methods: {
    updateStatus(status) {
      this.status = status
    },
    async getStripeCharges() {
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/charges?limit=10'
      })
        .then(response => {
          this.charges = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    async getStripeCustomers() {
      this.loading = true
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/customers?limit=20'
      })
        .then(response => {
          this.loading = false
          this.customers = response.data
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    },
    async updateStripeCharge(charge) {
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: `https://api.stripe.com/v1/charges/${charge.id}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: queryString.stringify({
          customer: charge.customer
        })
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
    linkCustomer(charge) {
      this.chargeModal.visible = true
      this.chargeModal.data = {
        charge,
        customers: this.customers.data
      }
    },
    findCustomer(id) {
      return this.customers.data.find(customer => customer.id === id)
    },
    findCustomerIndex(id) {
      return this.customers.data.findIndex(customer => customer.id === id)
    },
    findChargeIndex(id) {
      return this.charges.data.findIndex(charge => charge.id === id)
    },
    updateCharge(charge) {
      this.chargeModal.visible = false
      charge.customer = this.customer
      this.updateStripeCharge(charge)
    }
  }
}
</script>
