import {Component, Input} from 'angular2/core'
import {Item, Button, Icon} from 'ionic/ionic'
import Post from 'models/post.model'
import FirebaseSerivce from 'services/firebase.service'

@Component({
  selector: 'post-item',
  templateUrl: 'build/components/post.component.html',
  directives: [Item, Button, Icon]
})

export class PostComponent {
  @Input() post: Post
  @Input() currentUserUid: string

  constructor(
    private firebaseService: FirebaseSerivce
  ) {
  }

  toggleFavorite() {
    this.firebaseService.toggleFavorite(this.currentUserUid, this.post)
      .then(favorites => this.post.favorites = favorites)
  }
}
