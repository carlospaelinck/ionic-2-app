import {Injectable} from 'angular2/core'
import {Subject, BehaviorSubject} from 'rxjs/Rx'
import User from 'models/user.model'
import Post from 'models/post.model'

const Firebase = require('firebase')

@Injectable()
export default class FirebaseService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null)

  constructor() {
    this.rootRef = new Firebase('https://carlosionicapp.firebaseio.com')
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
    const {user, content} = options
    const postRef = this.rootRef.child('posts').push()

    const post = {
      userUid: user.uid,
      userName: user.name,
      content,
      timestamp: new Date().getTime()
    }

    postRef.set(post, error => console.error(error))
  }

  allPosts(): Subject<Post[]> {
    const postsObservable = new BehaviorSubject<Post[]>(null)

    this.rootRef.child('posts').on('value', snapshot => {
      const data = snapshot.val()
      const posts = Object.keys(data)
        .map(id => new Post(id, data[id]))
        .sort((lhs, rhs) => rhs.date.getTime() - lhs.date.getTime())

      postsObservable.next(posts)
    })

    return postsObservable
  }

  postsForUser(uid): Subject<Post[]> {
    const postsObservable = new BehaviorSubject<Post[]>(null)

    this.rootRef
      .child('posts')
      .orderByChild('userUid')
      .equalTo(uid)
      .on('value', snapshot => {
        const data = snapshot.val() || {}
        const posts = Object.keys(data)
          .map(id => new Post(id, data[id]))
          .sort((lhs, rhs) => rhs.date.getTime() - lhs.date.getTime())

        postsObservable.next(posts)
      })

    return postsObservable
  }

  toggleFavorite(userUid: string = '', post: Post) {
    const isAFavorite = post.favorites.indexOf(userUid) !== -1
    const favorites = isAFavorite ?
      post.favorites.filter(uid => uid !== userUid) :
      [...post.favorites, userUid]

    this.rootRef
      .child('posts')
      .child(post.id)
      .child('favorites')
      .set(favorites)
  }
}
