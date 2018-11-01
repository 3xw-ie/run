<template>
  <main v-if="true">
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card class="overflow-x-scroll">
        <h2 class="mb-4">Users</h2>
        <p class="mb-4">This page is a work in progress. The end goal is to load all users from all sources and merge them to ensure consistent data across all services - e.g. Intercom, Hubspot.</p>
        <table v-if="customers.data && users.users && leads.contacts">
          <thead class="text-left">
            <tr>
              <!-- <th v-for="key in keys" :key="key">{{ key }}</th> -->
              <th>Name</th>
              <th>Email</th>
              <th>Intercom</th>
              <th>Stripe</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in mergedUsers" :key="user.email" class="h-10">
              <!-- <td v-for="key in keys" :key="key" class="pr-8">
                {{ user[key] }}
              </td> -->
              <td class="pr-8">{{ user.name }}</td>
              <td class="pr-8">{{ user.email }}</td>
              <td class="pr-8">{{ user.id.intercom ? '✅' : '[]' }}</td>
              <td class="pr-8">{{ user.id.stripe ? '✅' : '[]' }}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </section>
  </main>
  <main v-else>
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        Sorry, no users found.
      </Card>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { merge, getAllKeys } from '~/utils/merge'
import Card from '~/components/Card'
import intercom from '~/plugins/intercom'
import stripe from '~/plugins/stripe'

export default {
  layout: 'dashboard',
  components: {
    Card
  },
  mixins: [intercom, stripe],
  computed: {
    mergedUsers() {
      return merge(
        [
          {
            name: 'stripe',
            data: this.customers.data
          },
          {
            name: 'intercom',
            data: this.users.users
          },
          {
            name: 'intercom',
            data: this.leads.contacts
          }
        ],
        'email'
      )
    },
    keys() {
      return getAllKeys(this.mergedUsers)
    },
    ...mapGetters(['account'])
  },
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Users')
  },
  mounted() {
    this.getIntercomUsers()
    this.getIntercomLeads({ email: true })
    this.getStripeCustomers()
  }
}
</script>
