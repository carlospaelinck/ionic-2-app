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
    this.firebaseService.currentUser.subscribe(user => this.user = user)
  }

  downloadPosts() {
    this.firebaseService.allPosts().subscribe(posts => this.posts = posts)
  }
}
