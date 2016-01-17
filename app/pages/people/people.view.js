import {Page} from 'ionic/ionic'
import FirebaseSerivce from 'services/firebase.service'
import User from 'models/user.model'

@Page({
  templateUrl: 'build/pages/people/people.html',
  providers: [FirebaseSerivce]
})

export class PeopleView {
  users: User[]

  constructor(firebaseService: FirebaseSerivce) {
    this.firebaseService = firebaseService
    this.firebaseService.allUsers()
      .then(users => this.users = users)
  }
}
