import {Page} from 'ionic-angular'
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
  filteredPosts: Post[] = []

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.postFilter = 'allPosts'
    this.userService.currentUser.subscribe(user => this.user = user)

    this.postService.allPosts().subscribe(posts => {
      this.posts = posts
      this.refreshPostSource()
    })
  }

  refreshPostSource() {
    if (this.postFilter === 'allPosts') {
      this.filteredPosts = this.posts

    } else if (this.postFilter === 'favoritedPosts') {
      const filterFavorites = post => post.favorites.indexOf(this.user.uid) !== -1
      this.filteredPosts = this.posts.filter(filterFavorites)
    }
  }
}
