<template>
  <nuxt/>
</template>

<script>
export default {
  middleware: ['authenticated', 'account']
}
</script>
