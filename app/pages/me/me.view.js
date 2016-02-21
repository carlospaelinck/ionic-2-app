import {Page, ActionSheet, NavController} from 'ionic-framework/ionic'
import {ViewChild, ElementRef} from 'angular2/core'
import {PostComponent} from 'components/post.component'

import PostService from 'services/post.service'
import UserService from 'services/user.service'

import User from 'models/user.model'
import Post from 'models/post.model'

@Page({
  templateUrl: 'build/pages/me/me.html',
  directives: [PostComponent]
})

export class MeView {
  @ViewChild('postTextArea') postTextArea: ElementRef

  user: User
  posts: Post[] = []

  constructor(
    private nav: NavController,
    private postService: PostService,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe(user => {
      this.user = user
      if (user) {
        this.downloadPosts()
      } else {
        this.posts = []
      }
    })
  }

  downloadPosts() {
    this.postService
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

    this.postService
      .createNewPost({
        user: this.user,
        content
      })
      .then(() => this.postTextArea.nativeElement.value = '')
  }

  login(email, password) {
    return this.userService
      .login({email, password})
      .catch(error => console.error(error))
  }

  logout() {
    this.userService.logout()
  }
}
