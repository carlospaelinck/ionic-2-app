import {Page, ActionSheet, NavController} from 'ionic/ionic'
import {PostComponent} from 'components/post.component'

import FirebaseSerivce from 'services/firebase.service'
import User from 'models/user.model'
import Post from 'models/post.model'

@Page({
  templateUrl: 'build/pages/me/me.html',
  directives: [PostComponent]
})

export class MeView {
  user: User

  constructor(
    private nav: NavController,
    private firebaseService: FirebaseSerivce
  ) {
    this.checkAuthenticationStatus()
  }

  checkAuthenticationStatus() {
    if (this.firebaseService.deviceContainsUserAuthToken()) {
      this.firebaseService.refreshAuth()
        .then(user => {
          this.user = user
          this.downloadPosts()
        })
    }
  }

  downloadPosts() {
    this.firebaseService.postsForUser(this.user.uid)
      .then(posts => this.posts = posts)
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
      .then(user => {
        this.user = user
        this.downloadPosts()
      })
  }

  logout() {
    this.firebaseService
      .logout()
      .then(() => this.user = null)
  }
}
