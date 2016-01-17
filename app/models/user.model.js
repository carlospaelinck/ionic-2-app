export default class User {
  name: string
  emailAddress: string
  
  constructor(json) {
    this.name = json.name || ''
    this.emailAddress = json.emailAddress || ''
  }
}
