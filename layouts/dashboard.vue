<template>
  <main class="min-h-screen w-full flex flex-col">
    <header :style="'background-color:' + dashboard.color" class="flex justify-between bg-blue text-white p-4 border-b-2">
      <h1>{{ dashboard.title ? dashboard.title : 'Dashboard' }}</h1>
      <navbar class="flex items-center text-white"/>
    </header>
    <section class="flex-1 flex flex-col">
      <nuxt :style="'background-color: ' + dashboard.backgroundColor" class="flex-1 p-4 border-l-2 bg-grey-lightest"/>
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
