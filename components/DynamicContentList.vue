<template>
  <div v-if="contentType === 'eventbrite.events'">
    <DynamicContentItem v-for="item in content" :key="item.id" :content="item" :content-type="contentType"/>
  </div>
</template>

<script>
import DynamicContentItem from '~/components/DynamicContentItem'

export default {
  components: {
    DynamicContentItem
  },
  props: {
    content: {
      type: Array,
      default: null
    },
    contentType: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selected: []
    }
  },
  mounted() {
    this.$on('selected', item => {
      if (!this.selected.includes(item)) {
        this.selected.push(item)
      }
      this.$parent.$emit('selectedItems', this.selected)
    })
    this.$on('deselected', item => {
      if (this.selected.includes(item)) {
        this.selected.splice(
          this.selected.findIndex(element => element === item),
          1
        )
      }
      this.$parent.$emit('selectedItems', this.selected)
    })
  }
}
</script>
