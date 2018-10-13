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
    <template v-if="card.type === 'intercom.counts.user.segment'">
      <table v-if="!loading">
        <tbody>
          <tr v-for="segment in data" :key="segment.name">
            <td class="pr-4">{{ segment.name }}</td>
            <td>{{ segment.count }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <p v-if="status === 'success'" class="mt-4 text-green" v-text="'Success! 🎉'"/>
    <p v-if="status === 'error'" class="mt-4 text-red" v-text="'Something went wrong.'"/>
    <p v-if="loading">Loading...</p>
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
      data: null,
      status: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['dashboard', 'intercomToken'])
  },
  mounted() {
    if (this.card.type === 'intercom.counts.user.segment') {
      this.getIntercomUserSegmentCount(this.card.segments)
    }
  },
  methods: {
    async handleButtonClick() {
      this.loading = true
      const button = this.card.button
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
    },
    updateStatus(status) {
      this.status = status
    },
    async getIntercomUserSegmentCount(segments) {
      this.loading = true
      await this.$axios({
        url: '/api/intercom/counts?type=user&count=segment',
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.intercomToken}`
        }
      })
        .then(response => {
          this.data = this.prepareSegments(response.data.user.segment)
          this.loading = false
        })
        .catch(error => console.error(error))
    },
    prepareSegments(segments) {
      let output = []

      if (this.card.segments) {
        this.card.segments.forEach(wanted => {
          const segment = segments.find(
            segment => Object.keys(segment)[0] === wanted
          )
          output.push({
            name: wanted,
            count: segment ? segment[Object.keys(segment)] : 0
          })
        })
      } else {
        segments.forEach(segment => {
          output.push({
            name: Object.keys(segment)[0],
            count: segment[Object.keys(segment)]
          })
        })
      }
      return output
    }
  }
}
</script>
