import {Injectable} from 'angular2/core'
import {Subject, BehaviorSubject} from 'rxjs/Rx'
import User from 'models/user.model'
import Post from 'models/post.model'

// const Firebase = require('firebase')
import * as Firebase from 'firebase'

@Injectable()
export default class FirebaseService {
  constructor() {
    this.rootRef = new Firebase('https://carlosionicapp.firebaseio.com')
  }
}
