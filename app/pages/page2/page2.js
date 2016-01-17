import {Page} from 'ionic/ionic'
import FirebaseSerivce from 'services/firebase.service'

@Page({
  templateUrl: 'build/pages/page2/page2.html',
  providers: [FirebaseSerivce]
})

export class Page2 {
  constructor(firebaseService: FirebaseSerivce) {
  }
}
