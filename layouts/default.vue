<template>
  <main class="min-h-screen w-full flex">
    <navbar class="min-h-screen w-1/5 bg-white flex flex-col p-4 pt-20 items-center"/>
    <nuxt class="w-4/5 flex flex-col bg-grey-lightest"/>
  </main>
</template>

<script>
import navbar from '~/components/navbar'

export default {
  components: {
    navbar
  }
}
</script>
