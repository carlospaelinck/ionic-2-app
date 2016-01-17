import {Page} from 'ionic/ionic'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/me/me.html',
  providers: [FirebaseSerivce]
})

export class MeView {
  constructor(firebaseService: FirebaseSerivce) {
  }
}
