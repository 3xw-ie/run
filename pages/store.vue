<template>
  <pre>{{ $store.state }}</pre>
</template>

<script>
export default {
  layout: 'empty',
  mounted() {
    console.log(this)
  }
}
</script>
