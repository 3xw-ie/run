<template>
  <figure>
    <p>Balance: {{ data.available[0].amount }}</p>
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
    this.getStripeBalance()
  }
}
</script>
