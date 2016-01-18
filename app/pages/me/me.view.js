import {Page, ActionSheet, NavController} from 'ionic/ionic'
import FirebaseSerivce from 'services/firebase.service'
import User from 'models/user.model'

@Page({
  templateUrl: 'build/pages/me/me.html'
})

export class MeView {
  user: User

  constructor(
    nav: NavController,
    firebaseService: FirebaseSerivce
  ) {
    this.nav = nav
    this.user = null
    this.firebaseService = firebaseService
    this.checkAuthenticationStatus()
  }

  checkAuthenticationStatus() {
    if (!this.firebaseService.deviceContainsUserAuthToken()) {
      // this.showLoginAlert()

    } else {
      this.firebaseService.refreshAuth()
        .then(user => {
          this.user = user
        })
        .catch(() => {})
    }
  }

  showUserActionSheet() {
    const actionSheet = ActionSheet.create({
      buttons: [
        {
          text: 'Log Out',
          style: 'destructive',
          handler: () => this.logout()
        }
      ]
    })

    this.nav.present(actionSheet)
  }

  createPost(content) {
    if (content.length <= 0) {
      return
    }

    this.firebaseService.createNewPost({
      user: this.user,
      content
    })
  }

  login(email, password) {
    return this.firebaseService
      .login({email, password})
      .then(user => this.user = user)
  }

  logout() {
    this.firebaseService
      .logout()
      .then(() => this.user = null)
  }
}
