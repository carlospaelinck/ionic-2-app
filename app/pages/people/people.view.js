import {Page} from 'ionic/ionic'
import {PeopleDetailView} from './people.detail'

import UserService from 'services/user.service'

import User from 'models/user.model'

@Page({
  templateUrl: 'build/pages/people/people.view.html'
})

export class PeopleView {
  users: User[] = []

  constructor(
    private userService: UserService
  ) {
    this.peopleDetailView = PeopleDetailView
    this.downloadAllUsers()
  }

  downloadAllUsers() {
    this.userService.allUsers()
      .then(users => this.users = users)
  }
}
