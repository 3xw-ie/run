<template>
  <nav class="mr-2">
    <nuxt-link to="/settings" class="text-inherit no-underline mr-4">Settings</nuxt-link>
    <nuxt-link to="/logout" class="text-inherit no-underline">Logout</nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated'])
}
</script>
