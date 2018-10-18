<template>
  <main>
    <section class="container mx-auto">
      <nuxt-link to="/stripe" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Stripe</nuxt-link>
      <Card class="mb-4 overflow-x-scroll">
        <h2 class="mb-4">Customers</h2>
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
      <Card>
        <h2 class="mb-4">Create a customer</h2>
        <form class="flex">
          <div class="flex-1 inline-flex flex-col">
            <label for="email">Email</label>
            <input v-model="customer.email" name="email" class="p-2 rounded bg-grey-lighter mr-4">
          </div>
          <div class="flex-1 inline-flex flex-col">
            <label for="description">Description</label>
            <input v-model="customer.description" name="description" class="p-2 rounded bg-grey-lighter mr-4">
          </div>
          <div class="flex flex-col justify-end">
            <button :style="'background-color:' + dashboard.primaryColor" type="submit" class="inline p-2 rounded bg-blue text-white" @click.prevent="createStripeCustomer()">Submit</button>
          </div>
        </form>
      </Card>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import queryString from 'query-string'
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
      customers: null,
      customer: {
        email: null,
        description: null
      }
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
    async getStripeCustomers() {
      this.loading = true
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/customers?limit=50'
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
    async createStripeCustomer() {
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: `https://api.stripe.com/v1/customers`,
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
