import * as md5 from 'md5'

export default class User {
  uid: string
  name: string
  emailAddress: string
  hash: string

  constructor(uid, json) {
    this.uid = uid || ''
    this.name = json.name || ''
    this.emailAddress = json.emailAddress || ''
    this.hash = md5(this.name)
  }

  avatarUrl(size: number = 100): string {
    return `http://www.gravatar.com/avatar/${this.hash}?d=retro&s=${size}`
  }
}
