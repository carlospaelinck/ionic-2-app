export default class User {
  uid: String
  name: string
  emailAddress: string

  constructor(uid, json) {
    this.uid = uid || ''
    this.name = json.name || ''
    this.emailAddress = json.emailAddress || ''
  }

  avatarUrl(size: number = 100): string {
    return `http://api.adorable.io/avatars/${size}/${this.emailAddress}.png`
  }
}
