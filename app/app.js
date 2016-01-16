import {App, Platform, Config} from 'ionic/ionic'
import {TabsPage} from './pages/tabs/tabs'

import FirebaseSerivce from './services/firebase.service'

@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {},
  providers: [FirebaseSerivce]
})

export class MyApp {
  constructor(platform: Platform, firebaseService: FirebaseSerivce) {
    this.root = TabsPage

    platform.ready().then(() => {

      // Do any necessary cordova or native calls here now that the platform is ready
    })
  }
}
