import {Page, NavParams} from 'ionic/ionic'
import {PostComponent} from 'components/post.component'
import User from 'models/user.model'
import Post from 'models/post.model'
import FirebaseService from 'services/firebase.service'

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
    private firebaseService: FirebaseService
  ) {
    this.pageUser = params.get('user')

    this.firebaseService
      .postsForUser(this.pageUser.uid)
      .subscribe(posts => this.posts = posts)

    this.firebaseService
      .currentUser
      .subscribe(user => this.user = user)
  }
}
