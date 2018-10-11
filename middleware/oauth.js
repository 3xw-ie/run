import axios from 'axios'
import setIntercomToken from '~/apollo/mutations/setIntercomToken'

export default function({ app, query, redirect }) {
  // app.apolloProvider.clients.defaultClient
  //   .query({
  //     query: setIntercomToken,
  //     variables: {
  //       domain: query.state,
  //       token: 'aaah'
  //     }
  //   })
  //   .catch(error => {
  //     axios({
  //       url: 'http://postb.in/OAMyZ94f',
  //       method: 'post',
  //       data: {
  //         type: 'error',
  //         message: JSON.stringify(error)
  //       }
  //     })
  //   })
  axios({
    url: 'https://api.intercom.io/auth/eagle/token',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      code: query.code,
      client_id: '15329d68-6aaf-47ab-84ad-09d8d73f97be',
      client_secret: '2b8eea09-0c43-4d9c-9b9b-7b2961cd41c2'
    }
  })
    .then(response => {
      app.apolloProvider.clients.defaultClient.mutate({
        mutation: setIntercomToken,
        variables: {
          domain: query.state,
          token: response.data.token
        }
      })
    })
    .then(response => {
      axios({
        url: 'http://postb.in/OAMyZ94f',
        method: 'post',
        data: {
          domain: query.state,
          token: response.data.token
        }
      })
    })
    .catch(error => {
      axios({
        url: 'http://postb.in/OAMyZ94f',
        method: 'post',
        data: {
          type: 'error',
          message: JSON.stringify(error)
        }
      })
    })

  return redirect('/settings')
}
