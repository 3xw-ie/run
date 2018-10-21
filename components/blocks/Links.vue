<template>
  <figure class="flex flex-wrap">
    <a
      v-for="link in block.links"
      :key="link.url"
      :href="link.url"
      target="_blank"
      class="w-1/2 block leading-normal text-blue no-underline"
    >
      {{ link.text }}
    </a>
  </figure>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: null
    }
  }
}
</script>
