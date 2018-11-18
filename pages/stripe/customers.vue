<template>
  <main>
    <section class="container mx-auto">
      <nuxt-link to="/stripe" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Stripe</nuxt-link>
      <Card class="mb-4 overflow-x-scroll">
        <h2 class="mb-4">Customers</h2>
        <table v-if="customers.data">
          <thead class="text-left">
            <tr>
              <th>Email</th>
              <th>Description</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers.data" :key="customer.id" class="h-10">
              <td class="pr-8">
                {{ customer.email }}
              </td>
              <td class="pr-8">{{ customer.description }}</td>
              <td class="pr-8">{{ customer.created | moment('Do MMM YYYY') }}</td>
              <td>
                <button class="rounded px-2 py-1 bg-red text-white text-xs" @click.prevent="selectedCustomer = customer; $openModal('confirmDeleteStripeCustomer')">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal ref="confirmDeleteStripeCustomer" title="Are you sure?">
          <p class="mb-2">You are about to delete Customer:</p>
          <ul>
            <li>ID: {{ selectedCustomer.id }}</li>
            <li>Email: {{ selectedCustomer.email }}</li>
            <li>Description: {{ selectedCustomer.description }}</li>
          </ul>
          <button class="px-3 py-2 rounded my-4 bg-red text-white border border-transparent" @click.prevent="deleteStripeCustomer(selectedCustomer); $closeModal('confirmDeleteStripeCustomer')">Delete</button>
          <button type="submit" class="px-3 py-2 rounded my-4 border border-black mr-2" @click.prevent="$closeModal('confirmDeleteStripeCustomer')">Cancel</button>
        </Modal>
        <p v-if="loading">Loading...</p>
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
import stripe from '~/plugins/stripe'
import Card from '~/components/Card'
import Modal from '~/components/Modal'

export default {
  layout: 'dashboard',
  components: {
    Card,
    Modal
  },
  mixins: [stripe],
  data() {
    return {
      customer: {
        email: null,
        description: null
      },
      selectedCustomer: {
        id: null
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
    //
  }
}
</script>
