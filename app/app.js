import {App, Platform, Config} from 'ionic-angular'
import {Type} from 'angular2/core'
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
  root: Type = TabsPage

  constructor(
    private userService: UserService,
    platform: Platform
  ) {
    platform.ready().then(() => {
      this.userService.checkAuthenticationStatus()
    })
  }
}
