import {Page} from 'ionic/ionic'
import User from 'models/user.model'
import Post from 'models/post.model'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/feed/feed.html'
})

export class FeedView {
  user: User
  posts: Post[]

  constructor(
    firebaseService: FirebaseSerivce
  ) {
    this.posts = []
    this.firebaseService = firebaseService
    this.downloadPosts()
  }

  downloadPosts() {
    this.firebaseService.allPosts()
      .then(posts => this.posts = posts)
  }
}
