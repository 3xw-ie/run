<template>
  <Card :class="[block.width ? `columns-${block.width}` : '', block.height ? `rows-${block.height}` : '']">

    <h3 v-if="block.title" class="mb-2">{{ block.title }}</h3>

    <component :is="component" :block="block"/>
    
    <p v-if="status.state === 'success'" class="text-green" v-text="status.message ? status.message : 'Success! 🎉'"/>
    <p v-if="status.state === 'error'" class="text-red" v-text="status.message ? status.message : 'Something went wrong.'"/>

    <slot/>

  </Card>
</template>

<script>
import Card from '~/components/Card'
import blocks from '~/components/blocks'
import status from '~/plugins/status'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card,
    ...blocks
  },
  mixins: [status],
  props: {
    block: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    component() {
      return this.block.type
        .split('.')
        .map(e => {
          return e.charAt(0).toUpperCase() + e.substr(1)
        })
        .join('')
    }
  },
  mounted() {
    this.$on('updateStatus', status => (this.status = status))
  }
}
</script>
