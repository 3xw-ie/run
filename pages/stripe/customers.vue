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
import stripe from '~/plugins/stripe'
import Card from '~/components/Card'

export default {
  layout: 'dashboard',
  components: {
    Card
  },
  mixins: [stripe],
  data() {
    return {
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
    //
  }
}
</script>
