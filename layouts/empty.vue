<template>
  <nuxt :style="'background-color:'" class="min-h-screen w-full flex justify-center items-center bg-grey"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: function() {
    return {
      title: this.metaTitle
    }
  },
  middleware: ['account'],
  computed: mapGetters(['metaTitle', 'dashboard'])
}
</script>
