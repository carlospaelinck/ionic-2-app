import {App, Platform, Config} from 'ionic/ionic'
import {TabsPage} from './pages/tabs/tabs'
import FirebaseService from 'services/firebase.service'

@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {},
  providers: [FirebaseService]
})

export class MyApp {
  constructor(
    private firebaseService: FirebaseService,
    platform: Platform
  ) {
    this.root = TabsPage

    platform.ready().then(() => {
      this.firebaseService.checkAuthenticationStatus()
    })
  }
}
