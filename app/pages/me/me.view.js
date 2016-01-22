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
  posts: Post[] = []

  constructor(
    private nav: NavController,
    private firebaseService: FirebaseSerivce
  ) {
    this.firebaseService.currentUser.subscribe(user => {
      this.user = user
      if (user) {
        this.downloadPosts()
      } else {
        this.posts = []
      }
    })
  }

  downloadPosts() {
    this.firebaseService
      .postsForUser(this.user.uid)
      .subscribe(posts => this.posts = posts)
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
      .catch(error => console.error(error))
  }

  logout() {
    this.firebaseService.logout()
  }
}
