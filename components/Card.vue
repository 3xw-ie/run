<template>
  <div class="rounded bg-white shadow-md p-4">
    <slot/>
  </div>
</template>

<script>
import status from '~/plugins/status'
export default {
  mixins: [status],
  mounted() {
    this.$on('updateStatus', status =>
      this.$parent.$emit('updateStatus', status)
    )
    this.$on('selectedItems', selectedItems =>
      this.$parent.$emit('selectedItems', selectedItems)
    )
  }
}
</script>


<style>
.card {
  @apply rounded bg-white shadow-md p-4;
}
</style>
