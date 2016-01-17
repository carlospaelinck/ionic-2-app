import {Page, Alert, NavController} from 'ionic/ionic'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/feed/feed.html',
  providers: [FirebaseSerivce]
})

export class FeedView {
  constructor(
    nav: NavController
    firebaseService: FirebaseSerivce
  ) {
    this.nav = nav
    this.firebaseService = firebaseService

    if (!this.firebaseService.deviceContainsUserAuthToken()) {
      this.showLoginAlert()

    } else {
      this.firebaseService.refreshAuth()
        .then(user => console.log(user))
    }
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
      .then(user => console.log(user))
  }
}
