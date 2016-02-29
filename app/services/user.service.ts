import {Injectable} from 'angular2/core'
import {Subject, BehaviorSubject} from 'rxjs/Rx'

import FirebaseService from 'services/firebase.service'
import User from 'models/user.model'

@Injectable()
export default class UserService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null)

  constructor(firebaseService: FirebaseService) {
    this.rootRef = firebaseService.rootRef
  }

  checkAuthenticationStatus() {
    const userAuthToken = localStorage.userAuthToken

    if (!userAuthToken) {
      localStorage.removeItem('userAuthToken')
      this.currentUser.next(null)

    } else {
      this.rootRef.authWithCustomToken(userAuthToken, (error, authData) => {
        if (!error) {
          localStorage.userAuthToken = authData.token
          this.createUserFromAuthData(authData.uid)
            .then(user => this.currentUser.next(user))

        } else {
          this.currentUser.next(null)
        }
      })
    }
  }

  createUserFromAuthData(userUid) {
    return new Promise((resolve, reject) => {
      this.rootRef.child('users').child(userUid).once('value', snapshot => {
        const authenticatedUser = new User(userUid, snapshot.val())
        resolve(authenticatedUser)
      })
    })
  }

  logout() {
    this.rootRef.unauth()
    localStorage.removeItem('userAuthToken')
    this.currentUser.next(null)
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
          this.createUserFromAuthData(authData.uid)
            .then(user => this.currentUser.next(user))
        }
      })
    })
  }

  allUsers() {
    return new Promise((resolve, reject) => {
      this.rootRef.child('users').once('value', snapshot => {
        const data = snapshot.val()
        const users = Object.keys(data).map(id => new User(id, data[id]))
        resolve(users)
      })
    })
  }
}
