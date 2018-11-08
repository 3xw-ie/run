import status from '~/plugins/status'
import { mapGetters } from 'vuex'
import moment from 'moment'

const sendgrid = {
  data() {
    return {
      templates: null,
      dynamic_template_data: {},
      to: {},
      email: {
        personalizations: [
          {
            to: [
              {
                email: 'dave@3xw.ie',
                name: 'Dave Calnan'
              }
            ],
            dynamic_template_data: {
              //
            }
          }
        ],
        // subject: null,
        from: {
          email: 'stephen@24stories.ie',
          name: 'Stephen Ryan'
        },
        reply_to: {
          email: 'stephen@narration.ie',
          name: 'Stephen Ryan'
        },
        template_id: null
      }
    }
  },
  computed: {
    sendgridConfig() {
      return {
        baseURL: 'https://api.sendgrid.com/v3',
        headers: {
          Authorization: `Bearer ${this.account.sendgridToken}`
        }
      }
    },
    ...mapGetters(['account'])
  },
  methods: {
    async getSendgridTemplates(generations = 'dynamic') {
      this.updateStatus('loading')
      await this.$axios({
        url: `/templates?generations=${generations}`,
        ...this.sendgridConfig
      })
        .then(response => {
          this.templates = response.data.templates
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async getSendgridTemplate(id) {
      this.updateStatus('loading')
      await this.$axios({
        url: `/templates/${id}`,
        ...this.sendgridConfig
      })
        .then(response => {
          this.template = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    async sendSendgridEmail() {
      this.updateStatus('loading')
      await this.$axios({
        method: 'post',
        url: '/mail/send',
        data: this.email,
        ...this.sendgridConfig
      })
        .then(response => {
          this.template = response.data
          this.updateStatus('ready')
        })
        .catch(error => {
          console.error(error)
          this.updateStatus('error')
        })
    },
    prepareEventbriteEventsForSendgrid(events) {
      return events.map(event => ({
        name: event.name.text,
        description: event.description.html,
        url: event.url,
        start: {
          date: moment(event.start.local).format('Do MMMM YYYY'),
          time: moment(event.start.local).format('ha')
        },
        end: {
          date: moment(event.end.local).format('Do MMMM YYYY'),
          time: moment(event.end.local).format('ha')
        },
        image: event.logo.url
      }))
    }
  }
}

export default sendgrid
