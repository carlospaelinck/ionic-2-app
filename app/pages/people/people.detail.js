import {Page, NavParams} from 'ionic/ionic'
import {PostComponent} from 'components/post.component'
import User from 'models/user.model'
import Post from 'models/post.model'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/people/people.detail.html',
  directives: [PostComponent]
})

export class PeopleDetailView {
  user: User
  posts: Post[] = []

  constructor(
    params: NavParams,
    private firebaseSerivce: FirebaseSerivce
  ) {
    this.user = params.get('user')

    firebaseSerivce.postsForUser(this.user.uid)
      .then(posts => this.posts = posts)
  }
}
