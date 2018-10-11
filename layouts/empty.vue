<template>
  <nuxt :style="'background-color:' + dashboard.backgroundColor" class="min-h-screen w-full flex justify-center items-center bg-grey"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: function() {
    return {
      title: this.pageTitle
    }
  },
  middleware: ['account'],
  computed: mapGetters(['pageTitle', 'dashboard'])
}
</script>
