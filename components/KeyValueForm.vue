<template>
  <form action="">
    <input v-for="(pair, i) in Object.keys(data)" :key="Object.keys(data)[i]">
  </form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>
