import {App, Platform, Config} from 'ionic-framework/ionic'
import {Type} from 'angular2/core'

import FirebaseService from 'services/firebase.service'
import PostService from 'services/post.service'
import UserService from 'services/user.service'

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers: [FirebaseService, UserService, PostService]
})

export class MyApp {
  constructor(
    private userService: UserService,
    platform: Platform
  ) {
    platform.ready().then(() => {
      this.userService.checkAuthenticationStatus()
    })
  }
}
