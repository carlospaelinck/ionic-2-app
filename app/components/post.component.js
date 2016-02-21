import {Component, Input} from 'angular2/core'
import {Item, Button, Icon} from 'ionic-framework/ionic'

import PostService from 'services/post.service'

import Post from 'models/post.model'
import User from 'models/user.model'

@Component({
  selector: 'post-item',
  templateUrl: 'build/components/post.component.html',
  directives: [Item, Button, Icon]
})

export class PostComponent {
  @Input() post: Post
  @Input() user: User

  constructor(
    private postService: PostService
  ) {
  }

  toggleFavorite() {
    this.postService.toggleFavorite(this.user.uid, this.post)
  }
}
