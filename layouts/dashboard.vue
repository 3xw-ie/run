<template>
  <main class="min-h-screen w-full flex flex-col">
    <header :style="'background-color:' + dashboard.primaryColor" class="flex justify-between bg-blue text-white p-4 shadow-md">
      <h1>{{ dashboard.title ? dashboard.title : 'Dashboard' }}</h1>
      <navbar class="flex items-center text-white"/>
    </header>
    <section class="flex-1 flex flex-col">
      <nuxt class="flex-1 p-4 bg-grey-lighter"/>
    </section>
  </main>
</template>

<script>
import navbar from '~/components/navbar'
import { mapGetters } from 'vuex'

export default {
  head: function() {
    return {
      title: this.pageTitle
    }
  },
  middleware: ['authenticated', 'account', 'authorized'],
  components: {
    navbar
  },
  computed: {
    ...mapGetters(['dashboard', 'pageTitle'])
  }
}
</script>

<style>
.__nuxt-error-page {
  @apply w-full;
}
</style>
