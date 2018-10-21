const status = {
  data() {
    return {
      status: {
        state: null,
        message: null
      }
    }
  },
  computed: {
    loading() {
      return this.status.state === 'loading'
    }
  },
  methods: {
    updateStatus(state, message = null) {
      this.status = {
        state,
        message
      }
      this.$parent.$emit('updateStatus', {
        state,
        message
      })
    }
  }
}

export default status
