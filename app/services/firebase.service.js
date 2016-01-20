import {Injectable} from 'angular2/core'
import User from 'models/user.model'
import Post from 'models/post.model'

const Firebase = require('firebase')

@Injectable()
export default class FirebaseService {
  user: User

  constructor() {
    this.rootRef = new Firebase('https://carlosionicapp.firebaseio.com')
  }

  logout() {
    return new Promise(resolve => {
      this.rootRef.unauth()
      this.user = null
      localStorage.removeItem('userAuthToken')
      localStorage.removeItem('userUid')
      resolve()
    })
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
        } else {
          reject()
        }
      })
    })
  }

  createUserFromAuthData(userUid) {
    return new Promise((resolve, reject) => {
      this.rootRef.child('users').child(userUid).once('value', snapshot => {
        const authenticatedUser = new User(userUid, snapshot.val())
        this.user = authenticatedUser
        resolve(authenticatedUser)
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

  createNewPost(options) {
    return new Promise(resolve => {
      const {user, content} = options
      const postRef = this.rootRef.child('posts').push()

      const post = {
        userUid: user.uid,
        userName: user.name,
        content,
        timestamp: new Date().getTime()
      }

      postRef.set(post, error => console.error(error))
    })
  }

  allPosts() {
    return new Promise((resolve, reject) => {
      this.rootRef.child('posts').on('value', snapshot => {
        const data = snapshot.val()
        const posts = Object.keys(data)
          .map(id => new Post(data[id]))
          .sort((lhs, rhs) => rhs.date.getTime() - lhs.date.getTime())

        resolve(posts)
      })
    })
  }

  postsForUser(uid) {
    return new Promise((resolve, reject) => {
      this.rootRef
        .child('posts')
        .orderByChild('userUid')
        .equalTo(uid)
        .on('value', snapshot => {
          const data = snapshot.val() || {}
          const posts = Object.keys(data)
            .map(id => new Post(data[id]))
            .sort((lhs, rhs) => rhs.date.getTime() - lhs.date.getTime())

          resolve(posts)
        })
    })
  }
}
