<template>
  <table v-if="data">
    <thead class="text-left">
      <tr>
        <th v-for="key in keys ? keys : Object.keys(data[0])" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row[0]" class="h-10">
        <td v-for="key in keys ? keys : Object.keys(data[0])" :key="key" class="pr-8">
          {{ row[key] ? row[key] : row[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null,
      required: true
    },
    keys: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>
table tbody > tr:nth-child(even) {
  @apply bg-grey-lighter;
}
</style>
