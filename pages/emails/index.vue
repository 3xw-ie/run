<template>
  <main>
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        <h2 class="mb-4">Emails</h2>
        <form>
          <div>
            <label>To</label>
            <label for="to_email">Email</label>
            <input v-model="email.personalizations[0].to[0].email" name="to_email" type="text" class="p-2 rounded bg-grey-lighter mr-4">
            <label for="to_name">Name</label>
            <input v-model="email.personalizations[0].to[0].name" name="to_name" type="text" class="p-2 rounded bg-grey-lighter mr-4">
          </div>
          <div>
            <label>From</label>
            <label for="from_email">Email</label>
            <input v-model="email.from.email" name="from_email" type="text" class="p-2 rounded bg-grey-lighter mr-4">
            <label for="from_name">Name</label>
            <input v-model="email.from.name" name="from_name" type="text" class="p-2 rounded bg-grey-lighter mr-4">
          </div>
          <div>
            <label>Reply to</label>
            <label for="reply_to_email">Email</label>
            <input v-model="email.reply_to.email" name="reply_to_email" type="text" class="p-2 rounded bg-grey-lighter mr-4">
            <label for="reply_to_name">Name</label>
            <input v-model="email.reply_to.name" name="reply_to_name" type="text" class="p-2 rounded bg-grey-lighter mr-4">
          </div>
          <div>
            <label for="template_id">Template</label>
            <select v-model="email.template_id" name="template_id" class="p-2 rounded bg-grey-lighter mr-4">
              <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
            </select>
          </div>
          <div>
            <label for="title">Title</label>
            <input v-model="email.personalizations[0].dynamic_template_data.title" name="title" type="text" class="p-2 rounded bg-grey-lighter mr-4">
          </div>
          <div>
            <label for="welcome">Welcome</label>
            <textarea v-model="email.personalizations[0].dynamic_template_data.welcome" name="welcome" type="text" class="p-2 rounded bg-grey-lighter mr-4"/>
          </div>
          <button type="submit" @click.prevent="prepareToSend()">Prepare to send</button>
          <button type="submit" @click.prevent="sendSendgridEmail()">Send</button>
        </form>
      </Card>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card'
import eventbrite from '~/plugins/eventbrite'
import sendgrid from '~/plugins/sendgrid'

export default {
  layout: 'dashboard',
  components: {
    Card
  },
  mixins: [eventbrite, sendgrid],
  data() {
    return {
      //
    }
  },
  computed: mapGetters(['account']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Emails')
  },
  mounted() {
    this.getSendgridTemplates()
    this.getSendgridTemplate('d-6a9e29cc6ee84352911ca8660e37dcc9')
    this.getEventbriteUserEvents()
  },
  methods: {
    prepareToSend() {
      // this.email.personalizations[0].to = this.to
      // this.email.personalizations[0].dynamic_template_data.title = this.dynamic_template_data.title
      // this.email.personalizations[0].dynamic_template_data.welcome = this.dynamic_template_data.welcome
      /* eslint-disable-next-line */
      this.email.personalizations[0].dynamic_template_data.events = this.prepareEventbriteEventsForSendgrid(this.events.events)
      console.log(this.email)
    }
  }
}
</script>
