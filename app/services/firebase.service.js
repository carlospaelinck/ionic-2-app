import {Injectable} from 'angular2/core'
import User from 'models/user.model'

const Firebase = require('firebase')

@Injectable()
export default class FirebaseService {
  user: User

  constructor() {
    this.rootRef = new Firebase('https://carlosionicapp.firebaseio.com')
  }

  login(options) {
    return new Promise((resolve, reject) => {
      if (!options.email || !options.password) {
        const error = new Error('An email address and password must be provided')
        reject(error)
        return
      }

      this.rootRef.authWithPassword(options, (error, authData) => {
        if (error) {
          reject(error)
        } else {
          localStorage.userAuthToken = authData.token
          localStorage.userUid = authData.uid

          this.createUserFromAuthData(authData.uid)
            .then(user => resolve(user))
        }
      })
    })
  }

  deviceContainsUserAuthToken() {
    return localStorage.userAuthToken
  }

  refreshAuth() {
    return new Promise((resolve, reject) => {
      const userAuthToken = localStorage.userAuthToken

      this.rootRef.authWithCustomToken(userAuthToken, (error, authData) => {
        if (!error) {
          localStorage.userAuthToken = authData.token
          localStorage.userUid = authData.uid

          this.createUserFromAuthData(authData.uid)
            .then(user => resolve(user))
        }
      })
    })
  }

  createUserFromAuthData(userUid) {
    return new Promise((resolve, reject) => {
      this.rootRef.child('users').child(userUid).once('value', response => {
        const authenticatedUser = new User(response.val())
        this.user = authenticatedUser
        resolve(authenticatedUser)
      })
    })
  }
}
