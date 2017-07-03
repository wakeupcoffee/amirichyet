import axios from 'axios'

export default {
  login (username, password, cb, errorCb) {
    axios.post('/api/public/user/authenticate', {
      username: username,
      password: password
    }).then(response => {
      response.data.success ? cb(response.data.token) : errorCb(response.data.message)
    }).catch(error => {
      errorCb("Connection Error");
    });
  },
  signup (user, cb, errorCb) {
    axios.post('/api/public/user/new', {
      user: user
    }).then(response => {
      response.data.success ? cb() : errorCb(response.data.message)
    }).catch(error => {
      errorCb("Connection Error");
    });
  },
  checkLogin (ax, cb, errorCb) {
    ax.get('/api/secure/check').then(response => {
      response.data.success ? cb() : errorCb();
    }).catch(error => {
      errorCb();
    })
  }
}
