<template>
  <figure>
    <ul class="list-reset mb-2">
      <li v-for="charge in charges.data" :key="charge.id">
        <span class="font-semibold text-grey-darkest leading-tight">€{{ charge.amount / 100 }}</span> charged <span class="italic"> {{ charge.created | moment('from', 'now') }}</span>.
      </li>
    </ul>
    <nuxt-link to="/stripe/charges" class="text-blue no-underline">See all &rarr;</nuxt-link>
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
    this.getStripeCharges({
      limit: 5
    })
  }
}
</script>
