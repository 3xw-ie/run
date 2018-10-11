<template>
  <nav class="">
    <nuxt-link v-if="!isAuthenticated" to="/login" class="text-inherit no-underline">Login</nuxt-link>
    <nuxt-link v-else to="/logout" class="text-inherit no-underline">Logout</nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated'])
}
</script>
