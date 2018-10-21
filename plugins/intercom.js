import { mapGetters } from 'vuex'

const intercom = {
  data() {
    return {
      counts: [],
      segments: []
    }
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    async getIntercomAppCounts(counts) {
      await this.$axios({
        url: `https://api.3xw.app/intercom/${
          this.account.intercomToken
        }/counts`,
        method: 'get'
      })
        .then(response => {
          this.counts = this.prepareIntercomCounts(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    prepareIntercomCounts(counts) {
      let output = []

      if (this.block.counts) {
        this.block.counts.forEach(wanted => {
          const match = Object.keys(counts).find(count => count === wanted)
          output.push({
            name: match + 's',
            count: counts[match].count
          })
        })
      } else {
        counts.forEach(count => {
          output.push({
            name: Object.keys(count)[0] + 's',
            count: count[Object.keys(count)]
          })
        })
      }
      return output
    },
    async getIntercomUserSegmentCount(segments) {
      await this.$axios({
        url: `https://api.3xw.app/intercom/${this.account.intercomToken}/counts?type=user&count=segment`, // eslint-disable-line
        method: 'get'
      })
        .then(response => {
          this.segments = this.prepareIntercomSegments(
            response.data.user.segment
          )
        })
        .catch(error => {
          console.error(error)
        })
    },
    prepareIntercomSegments(segments) {
      let output = []

      if (this.block.segments) {
        this.block.segments.forEach(wanted => {
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

export default intercom
