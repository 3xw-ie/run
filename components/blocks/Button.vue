<template>
  <figure>
    <button
      :style="`background-color: ${dashboard.primaryColor}`"
      type="submit"
      class="px-3 py-2 rounded my-4 text-white"
      @click.prevent="handleButtonClick()"
      v-text="block.button.text"
    />
  </figure>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  computed: mapGetters(['dashboard']),
  methods: {
    async handleButtonClick() {
      this.loading = true
      const button = this.block.button
      await this.$axios({
        url: button.url,
        method: button.action,
        data: button.payload
      })
        .then(response => {
          this.loading = false
          console.log(response)
          response.status <= 400
            ? this.updateStatus('success')
            : this.updateStatus('error')
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.updateStatus('error')
        })
    }
  }
}
</script>
