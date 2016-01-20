import {Page} from 'ionic/ionic'
import User from 'models/user.model'
import Post from 'models/post.model'
import {PostComponent} from 'components/post.component'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/feed/feed.html',
  directives: [PostComponent]
})

export class FeedView {
  user: User
  posts: Post[] = []

  constructor(
    private firebaseService: FirebaseSerivce
  ) {
    this.downloadPosts()
  }

  downloadPosts() {
    this.firebaseService.allPosts()
      .then(posts => this.posts = posts)
  }
}
