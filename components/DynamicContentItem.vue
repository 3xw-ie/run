<template>
  <div v-if="contentType === 'eventbrite.events'" :aria-checked="selected ? 'true' : 'false'" :class="[selected ? 'border-green hover:border-red focus:border-red focus:shadow-outline-red' : 'hover:border-blue focus:border-blue']" tabindex="0" role="checkbox" class="group flex items-center rounded p-4 mb-4 cursor-pointer border-2 focus:outline-none focus:shadow-outline" @click.prevent="toggleSelect()" @keydown.space.prevent="toggleSelect()" @mouseleave="$el.blur()">
    <div class="w-1/3 mr-4">
      <img :src="content.image" alt="Event Image">
    </div>
    <div class="w-1/2 mr-4">
      <h3>{{ content.name }}</h3>
      <p>{{ content.start.date }}</p>
      <p>{{ content.start.time }} - {{ content.end.time }}</p>
    </div>
    <div class="w-1/6 flex justify-center">
      <!-- icon-plus-circle -->
      <svg :class="[selected ? 'hidden' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui fill-current text-grey group-hover:text-blue group-focus:text-blue" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z"/></svg>
      <!-- icon-check-circle -->
      <svg :class="[selected ? 'block' : 'hidden']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="text-green group-hover:hidden group-focus:hidden"><path class="heroicon-ui fill-current" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"/></svg>
      <!-- icon-x-circle-->
      <svg :class="[selected ? 'group-hover:block group-focus:block' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="text-red hidden"><path class="heroicon-ui fill-current" d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm1.41-1.41A8 8 0 1 0 17.66 6.34 8 8 0 0 0 6.34 17.66zM13.41 12l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"/></svg>
    </div>
  </div>
  <div v-else>
    Content type not specified.
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null
    },
    contentType: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      selected: false
    }
  },
  methods: {
    toggleSelect() {
      this.selected = !this.selected
      this.$parent.$emit(
        this.selected ? 'selected' : 'deselected',
        this.content
      )
    }
  }
}
</script>
