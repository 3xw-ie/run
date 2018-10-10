<template>
  <div class="bg-white shadow-md p-4">
    <h3>{{ card.title }}</h3>
    <template v-if="card.type === 'links'">
      <a
        v-for="link in card.links"
        :key="link.url"
        :href="link.url"
        class="block my-2"
        v-text="link.text"
      />
    </template>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
