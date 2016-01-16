import {Page, Alert, NavController} from 'ionic/ionic'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [FirebaseSerivce]
})

export class Page1 {
  constructor(
    nav: NavController
    firebaseService: FirebaseSerivce
  ) {
    this.nav = nav
    this.firebaseService = firebaseService

    this.showLoginAlert()
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
      .then(authData => console.log(authData))
  }
}
