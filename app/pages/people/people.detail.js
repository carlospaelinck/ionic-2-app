import {Page, NavParams} from 'ionic/ionic'
import User from 'models/user.model'
import FirebaseSerivce from 'services/firebase.service'

const uuid = require('uuid4')

@Page({
  templateUrl: 'build/pages/people/people.detail.html'
})

export class PeopleDetailView {
  user: User

  constructor(
    params: NavParams,
    firebaseSerivce: FirebaseSerivce
  ) {
    this.user = params.get('user')
    // console.log(uuid())

    // const postRef = firebaseSerivce.rootRef.child('posts').push()
    // const postRefId = postRef.name()
    // console.log(postRefId)
    //
    // const post = {
    //   userUid: this.user.uid,
    //   userName: this.user.name,
    //   content: 'Hi getting coffee',
    //   timestamp: new Date().getTime()
    // }
    //
    // postRef.set(post, error => console.error(error))
  }
}
