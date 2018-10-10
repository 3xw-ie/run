<template>
  <main class="min-h-screen w-full flex">
    <navbar class="min-h-screen w-1/5 bg-white flex flex-col p-4 pt-20 items-center"/>
    <section class="w-4/5 flex flex-col">
      <header class="bg-blue text-white p-4 border-b-2">
        <h1>{{ dashboard.title ? dashboard.title : 'Dashboard' }}</h1>
      </header>
      <nuxt class="flex-1 p-4 border-l-2 bg-grey-lightest"/>
    </section>
  </main>
</template>

<script>
import navbar from '~/components/navbar'
import { mapGetters } from 'vuex'

export default {
  middleware: ['authenticated', 'account', 'authorized'],
  components: {
    navbar
  },
  computed: {
    ...mapGetters(['dashboard'])
  }
}
</script>

<style>
.__nuxt-error-page {
  @apply w-full;
}
</style>
