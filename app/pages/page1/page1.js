import {Page} from 'ionic/ionic'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [FirebaseSerivce]
})

export class Page1 {
  constructor(firebaseService: FirebaseSerivce) {
    this.firebaseService = firebaseService
  }

  login(email, password) {
    this.firebaseService
      .login({email, password})
      .then(authData => console.log(authData))
      .catch(error => console.error(error))
  }
}
