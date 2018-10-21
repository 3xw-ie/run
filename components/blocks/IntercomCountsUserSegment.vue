<template>
  <figure class="flex mt-4">
    <div v-for="(count, index) in segments" :key="count.name" :class="[`w-1/${segments.length}`, + index !== segments.length - 1 ? 'border-r-2' : '']" class="flex flex-col p-4 text-center">
      <h1>{{ count.count }}</h1>
      <p class="flex-1 flex justify-center items-center">{{ count.name }}</p>
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
    this.getIntercomUserSegmentCount(this.block.segments)
  }
}
</script>
