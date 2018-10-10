<template>
  <nav class="">
    <nuxt-link to="/" class="text-black no-underline">Home</nuxt-link>
    <nuxt-link v-if="!isAuthenticated" to="/login" class="text-black no-underline">Login</nuxt-link>
    <nuxt-link v-if="!isAuthenticated" to="/signup" class="text-black no-underline">Signup</nuxt-link>
    <nuxt-link v-else to="/logout" class="text-black no-underline">Logout</nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated', 'loggedUser'])
}
</script>
