import {Injectable} from 'angular2/core'
const Firebase = require('firebase')

@Injectable()
export default class FirebaseService {
  constructor() {
    this.rootRef = new Firebase('https://carlosionicapp.firebaseio.com')
    console.log('creating Firebase service')
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
          resolve(authData)
        }
      })
    })
  }
}
