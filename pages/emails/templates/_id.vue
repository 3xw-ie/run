<template>
  <main>
    <section class="container mx-auto">
      <h1 class="font-normal mb-2">
        <span class="font-semibold">24 Stories Events</span>
        <span class="text-grey-darkest">Email Template</span>
      </h1>
      <form>
        <Card class="md:flex mb-4 border-t-4 border-blue">
          <div class="md:w-1/3 md:mr-8">
            <h2 class="mb-2">Design</h2>
            <p class="mb-4 text-sm text-grey-darkest">How the email will look to your recipients. Here you can select the template your email will use.</p>
          </div>
          <div class="md:w-2/3 mt-1">
            <div class="flex-1 flex flex-col">
              <label for="template_id" class="mb-1 text-sm">Template</label>
              <select v-model="email.template_id" name="template_id" class="h-9 rounded-sm bg-grey-lighter mb-8 border border-grey-light">
                <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
              </select>
            </div>
          </div>
        </Card>
        <Card class="md:flex mb-4 border-t-4 border-blue">
          <div class="md:w-1/3 md:mr-8">
            <h2 class="mb-2">Custom Content</h2>
            <p class="mb-4 text-sm text-grey-darkest">Content which is specific to this email template for you to enter manually</p>
            <p class="mb-4 text-sm text-grey-darkest">e.g. Monthly Update</p>
          </div>
          <div class="md:w-2/3 mt-1">
            <div class="flex flex-col">
              <label for="title" class="mb-1 text-sm">Title</label>
              <input v-model="email.personalizations[0].dynamic_template_data.title" name="title" type="text" class="p-2 rounded-sm bg-grey-lighter mb-8 border border-grey-light">
            </div>
            <div class="flex flex-col">
              <label for="welcome" class="mb-1 text-sm">Welcome</label>
              <textarea v-model="email.personalizations[0].dynamic_template_data.welcome" name="welcome" type="text" rows="5" class="p-2 rounded-sm bg-grey-lighter mb-4 border border-grey-light"/>
            </div>
          </div>
        </Card>
        <Card class="flex flex-col md:flex-row mb-4 border-t-4 border-blue">
          <div class="md:w-1/3 md:mr-8">
            <h2 class="mb-2">Dynamic Content</h2>
            <p class="mb-4 text-sm text-grey-darkest">Content which is pulled in from outside sources such as events, blog posts, or business statistics.</p>
            <p class="mb-4 text-sm text-grey-darkest">e.g. Your Upcoming Events</p>
          </div>
          <div class="md:w-2/3 mt-1">
            <h3 class="mb-4">Events</h3>
            <Dynamic-Content-List :content="dynamicContent" :content-type="dynamicContentType"/>
          </div>
        </Card>
        <Card class="md:flex mb-4 border-t-4 border-blue">
          <div class="md:w-1/3 md:mr-8">
            <h2 class="mb-2">Details</h2>
            <p class="mb-4 text-sm text-grey-darkest">From whom the email will appear to come, and to whom replies to the email will be sent.</p>
          </div>
          <div class="md:w-2/3 mt-1">
            <div class="md:flex md:items-center">
              <div class="flex-1 flex flex-col md:mr-4">
                <label for="from_email" class="mb-1 text-sm">From Email</label>
                <input v-model="email.from.email" name="from_email" type="text" class="p-2 rounded-sm bg-grey-lighter mb-8 border border-grey-light">
              </div>
              <div class="flex-1 flex flex-col">
                <label for="from_name" class="mb-1 text-sm">From Name</label>
                <input v-model="email.from.name" name="from_name" type="text" class="p-2 rounded-sm bg-grey-lighter mb-8 border border-grey-light">
              </div>
            </div>
            <div class="md:flex md:items-center">
              <div class="flex-1 flex flex-col mr-4">
                <label for="reply_to_email" class="mb-1 text-sm">Reply to Email</label>
                <input v-model="email.reply_to.email" name="reply_to_email" type="text" class="p-2 rounded-sm bg-grey-lighter mb-8 border border-grey-light">
              </div>
              <div class="flex-1 flex flex-col">
                <label for="reply_to_name" class="mb-1 text-sm">Reply to Name</label>
                <input v-model="email.reply_to.name" name="reply_to_name" type="text" class="p-2 rounded-sm bg-grey-lighter mb-8 border border-grey-light">
              </div>
            </div>
          </div>
        </Card>
        <Card class="md:flex mb-4 border-t-4 border-blue">
          <div class="md:w-1/3 md:mr-8">
            <h2 class="mb-2">Recipients</h2>
            <p class="mb-4 text-sm text-grey-darkest">To whom the email will be sent. Make sure not to put all of your users in the <strong>to</strong> field as their email addresses will be visible to every recipient.</p>
          </div>
          <div class="md:w-2/3 mt-1">
            <div class="flex flex-col">
              <label for="welcome" class="mb-1 text-sm">To</label>
              <textarea name="welcome" type="text" rows="5" class="p-2 rounded-sm bg-grey-lighter mb-4 border border-grey-light" @blur="email.personalizations[0].to = JSON.parse($event.target.value)" v-text="email.personalizations[0].to"/>
            </div>
            <div class="flex flex-col">
              <label for="welcome" class="mb-1 text-sm">CC</label>
              <textarea name="welcome" type="text" rows="5" class="p-2 rounded-sm bg-grey-lighter mb-4 border border-grey-light" @blur="email.personalizations[0].cc = JSON.parse($event.target.value)" v-text="email.personalizations[0].cc"/>
            </div>
            <div class="flex flex-col">
              <label for="welcome" class="mb-1 text-sm">BCC</label>
              <textarea name="welcome" type="text" rows="5" class="p-2 rounded-sm bg-grey-lighter mb-4 border border-grey-light" @blur="email.personalizations[0].bcc = JSON.parse($event.target.value)" v-text="email.personalizations[0].bcc"/>
            </div>
          </div>
        </Card>
        <Card class="flex flex-col md:flex-row mb-4 border-t-4 border-blue">
          <div class="md:w-1/3 md:mr-8">
            <h2 class="mb-2">Send</h2>
            <p class="mb-4 text-sm text-grey-darkest">The moment you've been waiting for. Double check you've got all the right details and hit that send button. We recommend sending a test email to yourself to make sure everything has worked as intended!</p>
          </div>
          <div class="md:w-2/3 mt-1 flex justify-center items-center">
            <button type="submit" class="px-3 py-2 rounded my-4 border border-black mr-2" @click.prevent="$openModal('sendTestEmail')">Send Test Email</button>
            <Modal ref="sendTestEmail" title="Send test email">
              <div class="md:flex md:justify-between md:items-center">
                <div>
                  <p class="mb-4">This feature is coming soon. Sorry about that!</p>
                </div>
                <button class="px-3 py-2 rounded my-4 bg-black text-white border border-transparent" @click.prevent="$closeModal('sendTestEmail')">Close</button>
              </div>
            </Modal>
            <button type="submit" class="px-3 py-2 rounded my-4 bg-black text-white border border-transparent" @click.prevent="$openModal('confirmSendEmail')">Send</button>
            <Modal ref="confirmSendEmail" title="Are you sure?">
              <div class="md:flex md:justify-between md:items-center">
                <div>
                  <p class="mb-4">Are you 100% positive you're ready to send?</p>
                  <p>If so, go ahead.</p>
                </div>
                <div>
                  <button class="px-3 py-2 rounded my-4 bg-black text-white border border-transparent" @click.prevent="sendSendgridEmail(); $closeModal('confirmSendEmail')">Confirm Send</button>
                  <button type="submit" class="px-3 py-2 rounded my-4 border border-black mr-2" @click.prevent="$closeModal('confirmSendEmail')">Cancel</button>
                </div>
              </div>
            </Modal>
          </div>
        </Card>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card'
import DynamicContentList from '~/components/DynamicContentList'
import Modal from '~/components/Modal'
import eventbrite from '~/plugins/eventbrite'
import intercom from '~/plugins/intercom'
import sendgrid from '~/plugins/sendgrid'

export default {
  layout: 'dashboard',
  components: {
    Card,
    DynamicContentList,
    Modal
  },
  mixins: [eventbrite, intercom, sendgrid],
  data() {
    return {
      dynamicContent: [],
      dynamicContentType: 'eventbrite.events',
      selectedDynamicContent: []
    }
  },
  computed: mapGetters(['account']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Emails')
  },
  mounted() {
    this.getSendgridTemplates()
    this.getSendgridTemplate('d-6a9e29cc6ee84352911ca8660e37dcc9')
    this.getEventbriteUserEvents().then(data => {
      this.dynamicContent = this.prepareEventbriteEventsForSendgrid(data.events)
    })
    this.getIntercomUsers().then(data => {
      this.email.personalizations[0].bcc = this.prepareIntercomUsersForSendgrid(data.users) // eslint-disable-line
      this.users = this.prepareIntercomUsersForSendgrid(data.users)
    })

    this.$on('selectedItems', selectedItems => {
      this.selectedDynamicContent = selectedItems
      this.email.personalizations[0].dynamic_template_data.events = this.selectedDynamicContent
    })
  },
  methods: {
    prepareToSend() {
      console.log(this.email)
    }
  }
}
</script>
