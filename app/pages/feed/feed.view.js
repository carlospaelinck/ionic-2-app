import {Page} from 'ionic/ionic'
import {PostComponent} from 'components/post.component'

import PostService from 'services/post.service'
import UserService from 'services/user.service'

import User from 'models/user.model'
import Post from 'models/post.model'

@Page({
  templateUrl: 'build/pages/feed/feed.html',
  directives: [PostComponent]
})

export class FeedView {
  user: User
  posts: Post[] = []

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.downloadPosts()
    this.userService.currentUser.subscribe(user => this.user = user)
  }

  downloadPosts() {
    this.postService.allPosts().subscribe(posts => this.posts = posts)
  }
}
