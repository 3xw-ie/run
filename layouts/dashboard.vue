<template>
  <main class="min-h-screen w-full flex flex-col">
    <header :style="'background-color:' + dashboard.primaryColor" class="flex items-center bg-blue px-4 text-white h-16 shadow-md">
      <h2>{{ page.title ? page.title : dashboard.title }}</h2>
      <navbar class="h-full flex-1 flex justify-end items-center text-white"/>
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
      title: this.metaTitle
    }
  },
  middleware: ['authenticated', 'account', 'authorized'],
  components: {
    navbar
  },
  computed: {
    ...mapGetters(['metaTitle', 'page', 'dashboard'])
  }
}
</script>

<style>
.__nuxt-error-page {
  @apply w-full;
}
</style>
