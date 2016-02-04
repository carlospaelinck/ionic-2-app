import {App, Platform, Config} from 'ionic/ionic'
import {TabsPage} from './pages/tabs/tabs'

import FirebaseService from 'services/firebase.service'
import PostService from 'services/post.service'
import UserService from 'services/user.service'

@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {},
  providers: [FirebaseService, UserService, PostService]
})

export class MyApp {
  constructor(
    private userService: UserService,
    platform: Platform
  ) {
    this.root = TabsPage

    platform.ready().then(() => {
      this.userService.checkAuthenticationStatus()
    })
  }
}
