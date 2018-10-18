<template>
  <main v-if="visible" class="fixed pin h-screen z-auto flex justify-center items-center" style="background-color: rgba(0, 0, 0, 0.5)" @click.self="hide()">
    <Card class="min-w-md">
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
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
}
</script>
