<template>
  <nav class="mr-2">
    <span class="group relative h-full flex items-center">
      <div class="group-hover:block hidden absolute pin-t mt-16 -mx-4 p-4 rounded-b bg-white shadow-md">
        <nuxt-link to="/intercom" class="inline-block text-black no-underline mb-4">Intercom</nuxt-link>
        <nuxt-link to="/stripe" class="inline-block text-black no-underline">Stripe</nuxt-link>
      </div>
      <nuxt-link to="/integrations" class="text-inherit no-underline mr-4">Integrations</nuxt-link>
    </span>
    <nuxt-link to="/logout" class="text-inherit no-underline">Logout</nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated'])
}
</script>
