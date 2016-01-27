import {Page} from 'ionic/ionic'
import {PeopleDetailView} from './people.detail'
import FirebaseService from 'services/firebase.service'
import User from 'models/user.model'

@Page({
  templateUrl: 'build/pages/people/people.view.html'
})

export class PeopleView {
  users: User[] = []

  constructor(
    private firebaseService: FirebaseService
  ) {
    this.peopleDetailView = PeopleDetailView
    this.downloadAllUsers()
  }

  downloadAllUsers() {
    this.firebaseService.allUsers()
      .then(users => this.users = users)
  }
}
