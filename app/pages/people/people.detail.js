import {Page, NavParams} from 'ionic/ionic'
import User from 'models/user.model'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/people/people.detail.html'
})

export class PeopleDetailView {
  user: User

  constructor(
    params: NavParams,
    firebaseSerivce: FirebaseSerivce
  ) {
    this.user = params.get('user')

    firebaseSerivce.postsForUser(this.user.uid)
      .then(posts => console.log(posts))
  }
}
