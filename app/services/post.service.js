import {Injectable} from 'angular2/core'
import {Subject, BehaviorSubject} from 'rxjs/Rx'

import FirebaseService from 'services/firebase.service'

import Post from 'models/post.model'
import User from 'models/user.model'

@Injectable()
export default class PostService {
  constructor(firebaseService: FirebaseService) {
    this.rootRef = firebaseService.rootRef
  }

  createNewPost(options) {
    return new Promise((resolve, reject) => {
      const {user, content} = options
      const postRef = this.rootRef.child('posts').push()

      const post = {
        userUid: user.uid,
        userName: user.name,
        content,
        timestamp: new Date().getTime()
      }

      postRef.set(post, error => {
        if (error) {
          reject()
        } else {
          resolve()
        }
      })
    })
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