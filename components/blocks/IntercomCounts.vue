<template>
  <figure class="flex mt-4">
    <div v-for="(count, index) in counts" :key="count.name" :class="[`w-1/${counts.length}`, + index !== counts.length - 1 ? 'border-r-2' : '']" class="flex flex-col p-4 text-center">
      <h1>{{ count.count }}</h1>
      <p class="flex-1 flex justify-center items-center capitalize">{{ count.name }}</p>
    </div>
  </figure>
</template>

<script>
import intercom from '~/plugins/intercom'

export default {
  mixins: [intercom],
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.getIntercomAppCounts(this.block.counts)
  }
}
</script>
