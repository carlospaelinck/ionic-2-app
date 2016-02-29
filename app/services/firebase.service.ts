import {Injectable} from 'angular2/core'
import {Subject, BehaviorSubject} from 'rxjs/Rx'
import * as Firebase from 'firebase'

@Injectable()
export default class FirebaseService {
  constructor() {
    this.rootRef = new Firebase('https://carlosionicapp.firebaseio.com')
  }
}
