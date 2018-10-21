<template>
  <figure>
    <ul class="list-reset mb-2">
      <li v-for="customer in customers.data" :key="customer.id">
        <span class="leading-tight">{{ customer.email }}</span>
      </li>
    </ul>
    <nuxt-link to="/stripe/customers" class="text-blue no-underline">See all &rarr;</nuxt-link>
  </figure>
</template>

<script>
import stripe from '~/plugins/stripe'

export default {
  mixins: [stripe],
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.getStripeCustomers(5)
  }
}
</script>
