<template>
  <main>
    <section class="container mx-auto">
      <nuxt-link to="/stripe" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Stripe</nuxt-link>
      <Card class="overflow-x-scroll">
        <h2 class="mb-4">Charges</h2>
        <table v-if="charges.data">
          <thead class="text-left">
            <tr>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="charge in charges.data" :key="charge.id" class="h-10">
              <td class="pr-4 text-center">
                <span v-if="charge.status === 'succeeded'" class="inline-block w-full p-1 rounded bg-green-lighter text-green-darker text-xs">Successful</span>
                <span v-if="charge.status === 'pending'" class="inline-block w-full p-1 rounded bg-yellow-lighter text-yellow-darker text-xs">Pending</span>
                <span v-if="charge.status === 'failed'" class="inline-block w-full p-1 rounded bg-red-lighter text-red-darker text-xs">Failed</span>
              </td>
              <td class="pr-8">€{{ charge.amount / 100 }}</td>
              <td class="pr-8">{{ charge.created | moment('Do MMM YYYY') }}</td>
              <td class="pr-8">
                {{ charge.customer && customers.data ? findCustomer(charge.customer).email : (charge.source.name ? charge.source.name : 'n/a') }}
                <button v-if="!charge.customer" :style="'background-color:' + dashboard.primaryColor" class="rounded px-2 py-1 bg-blue text-white text-xs" @click="openLinkCustomerModal(charge)">+ Link customer</button>
              </td>
              <td>
                <button v-if="charge.customer && !charge.receipt_email" :style="'background-color:' + dashboard.primaryColor" class="rounded px-2 py-1 bg-blue text-white text-xs" @click="sendReceipt(charge)">Send Receipt</button>
                <span v-if="charge.receipt_email" class="inline-block text-center p-1 rounded bg-grey-lighter text-grey-darker text-xs">Sent</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="loading">Loading...</p>
      </Card>
    </section>
    <Modal ref="chargeModal" :title="`Charge ${chargeModal.data.charge.id}`">
      <form v-if="chargeModal.data">
        <label for="customer">Customer</label>
        <select v-model="chargeModal.data.customer" name="customer" class="mb-2">
          <option v-for="customer in chargeModal.data.customers" :key="customer.id" :value="customer.id">{{ customer.email }}</option>
        </select>
        <nuxt-link to="/stripe/customers" class="block text-blue no-underline mb-4 text-sm">Create a customer &rarr;</nuxt-link>
        <button :style="'background-color:' + dashboard.primaryColor" type="submit" class="block p-2 rounded bg-blue text-white" @click.prevent="linkCustomer(chargeModal.data.charge, chargeModal.data.customer); closeLinkCustomerModal()">Update</button>
      </form>
    </Modal>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import status from '~/plugins/status'
import stripe from '~/plugins/stripe'
import queryString from 'query-string'
import Card from '~/components/Card'
import Modal from '~/components/Modal'

export default {
  layout: 'dashboard',
  components: {
    Card,
    Modal
  },
  mixins: [status, stripe],
  data() {
    return {
      chargeModal: {
        data: {
          charge: {
            id: null
          },
          customers: null
        },
        visible: false
      }
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
    openLinkCustomerModal(charge) {
      this.chargeModal.data = {
        charge,
        customers: this.customers.data,
        customer: null
      }
      this.$openModal('chargeModal')
    },
    closeLinkCustomerModal(charge, customer) {
      this.$closeModal('chargeModal')
      this.chargeModal.data.customer = null
    }
  }
}
</script>
