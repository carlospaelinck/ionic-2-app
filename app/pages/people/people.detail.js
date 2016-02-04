import {Page, NavParams} from 'ionic/ionic'
import {PostComponent} from 'components/post.component'

import PostService from 'services/post.service'
import UserService from 'services/user.service'

import User from 'models/user.model'
import Post from 'models/post.model'

@Page({
  templateUrl: 'build/pages/people/people.detail.html',
  directives: [PostComponent]
})

export class PeopleDetailView {
  user: User
  pageUser: User
  posts: Post[] = []

  constructor(
    params: NavParams,
    private postService: PostService,
    private userService: UserService
  ) {
    this.pageUser = params.get('user')

    this.postService
      .postsForUser(this.pageUser.uid)
      .subscribe(posts => this.posts = posts)

    this.userService
      .currentUser
      .subscribe(user => this.user = user)
  }
}
