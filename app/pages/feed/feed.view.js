import {Page, Alert, NavController} from 'ionic/ionic'
import User from 'models/user.model'
import Post from 'models/post.model'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/feed/feed.html'
})

export class FeedView {
  user: User
  posts: Post[]

  constructor(
    nav: NavController
    firebaseService: FirebaseSerivce
  ) {
    this.posts = []
    this.nav = nav
    this.firebaseService = firebaseService

    if (!this.firebaseService.deviceContainsUserAuthToken()) {
      this.showLoginAlert()

    } else {
      this.firebaseService.refreshAuth()
        .then(user => {
          this.user = user
          this.downloadPosts()
        })
        .catch(() => this.showLoginAlert())
    }
  }

  downloadPosts() {
    this.firebaseService.allPosts()
      .then(posts => this.posts = posts)
  }

  showLoginAlert() {
    const alert = Alert.create({
      title: 'Log In',
      inputs: [
        {
          name: 'emailAddress',
          placeholder: 'Email Address'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Log In',
          handler: data => {
            this.login(data.emailAddress, data.password)
              .then(() => alert.dismiss())
              .catch(() => alert.setMessage('Verify the email address and password are correct and try again.'))
            return false
          }
        }
      ]
    })

    this.nav.present(alert)
  }

  login(email, password) {
    return this.firebaseService
      .login({email, password})
      .then(user => {
        this.user = user
        this.downloadPosts()
      })
  }
}
