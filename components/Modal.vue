<template>
  <main v-show="visible" class="fixed pin h-screen z-auto flex justify-center items-center" style="background-color: rgba(0, 0, 0, 0.5)" @click.self="hide()">
    <Card class="min-w-md">
      <h3 v-if="title" class="mb-4">{{ title }}</h3>
      <slot/>
    </Card>
  </main>
</template>

<script>
import Card from '~/components/Card'

export default {
  components: {
    Card
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
}
</script>
