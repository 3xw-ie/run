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
    <template v-if="card.type === 'button'">
      <button
        :style="'background-color:' + dashboard.primaryColor"
        type="submit"
        class="px-3 py-2 rounded mt-4 text-white"
        @click.prevent="handleButtonClick()"
        v-text="card.button.text"
      />
    </template>
    <p v-if="status === 'success'" class="mt-4 text-green" v-text="'Success! 🎉'"/>
    <p v-if="status === 'error'" class="mt-4 text-red" v-text="'Something went wrong.'"/>
    <slot/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      status: ''
    }
  },
  computed: {
    ...mapGetters(['dashboard'])
  },
  methods: {
    async handleButtonClick() {
      const button = this.card.button
      await this.$axios({
        url: 'http://mockbin.org/bin/8bbbd27b-0396-4063-b4e3-8777a8dee54e/view',
        method: button.action,
        data: button.payload
      })
        .then(response => {
          console.log(response)
          response.status <= 400
            ? this.updateStatus('success')
            : this.updateStatus('error')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    updateStatus(status) {
      this.status = status
    }
  }
}
</script>
