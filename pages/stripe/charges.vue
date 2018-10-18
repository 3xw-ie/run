<template>
  <main>
    <section class="container mx-auto">
      <nuxt-link to="/stripe" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Stripe</nuxt-link>
      <Card class="overflow-x-scroll">
        <h1 class="mb-4">Charges</h1>
        <table v-if="!loading && charges">
          <thead class="text-left">
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Customer</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            <tr v-for="charge in charges.data" :key="charge.id" class="h-10">
              <td class="pr-8">€{{ charge.amount / 100 }}</td>
              <td class="pr-8">{{ charge.created | moment('Do MMM YYYY') }}</td>
              <td class="pr-8">
                {{ charge.customer && customers ? findCustomer(charge.customer).email : (charge.source.name ? `Name on card: ${charge.source.name}` : 'n/a') }}
                <button v-if="!charge.customer" :style="'background-color:' + dashboard.primaryColor" class="rounded ml-2 px-2 py-1 bg-blue text-white text-xs" @click="linkCustomer(charge)">+ Add customer</button>
              </td>
              <td>
                <button v-if="charge.customer && !charge.receipt_email" :style="'background-color:' + dashboard.primaryColor" class="rounded ml-2 px-2 py-1 bg-blue text-white text-xs" @click="sendReceipt(charge)">Send Receipt</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Loading...</p>
      </Card>
    </section>
    <Modal :visible="chargeModal.visible" @hide="chargeModal.visible = false">
      <form v-if="chargeModal.data">
        <h3 class="mb-4">Charge {{ chargeModal.data.charge.id }}</h3>
        <label for="customer">Customer</label>
        <select v-model="customer" name="customer" class="mb-4">
          <option v-for="customer in chargeModal.data.customers" :key="customer.id" :value="customer.id">{{ customer.email }}</option>
        </select>
        <button :style="'background-color:' + dashboard.primaryColor" type="submit" class="block p-2 rounded bg-blue text-white" @click.prevent="updateCharge(chargeModal.data.charge)">Update</button>
      </form>
    </Modal>
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
      charges: null,
      customers: null,
      chargeModal: {
        visible: false
      },
      customer: null
    }
  },
  computed: mapGetters(['account', 'dashboard']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Stripe Charges')
  },
  mounted() {
    this.getStripeCharges()
    this.getStripeCustomers()
  },
  methods: {
    updateStatus(status) {
      this.status = status
    },
    async getStripeCharges() {
      this.loading = true
      this.$axios.setToken('Bearer ' + this.account.stripeToken)
      await this.$axios({
        url: 'https://api.stripe.com/v1/charges?limit=10'
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
      this.updateStripeCharge(
        charge,
        queryString.stringify({
          customer: charge.customer
        })
      )
    },
    sendReceipt(charge) {
      charge.receipt_email = findCustomer(charge.customer).email
    }
  }
}
</script>
