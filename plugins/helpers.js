import Vue from 'vue'

const helpers = {
  install(Vue) {
    Vue.prototype.$openModal = function(ref) {
      if (!ref)
        return console.error(`No 'ref' argument passed to method $openModal.`)

      if (!this.$refs[ref])
        return console.error(`Modal with ref '${ref}' not found.`)

      return (this.$refs[ref].visible = true)
    }

    Vue.prototype.$closeModal = function(ref) {
      if (!ref)
        return console.error(`No 'ref' argument passed to method $closeModal.`)

      if (!this.$refs[ref])
        return console.error(`Modal with ref '${ref}' not found.`)

      return (this.$refs[ref].visible = false)
    }
  }
}

Vue.use(helpers)
