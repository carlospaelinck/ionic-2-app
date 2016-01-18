export default class Post {
  userUid: String
  userName: string
  content: string
  date: Date

  constructor(json) {
    this.userUid = json.userUid || ''
    this.userName = json.userName || ''
    this.content = json.content || ''
    this.date = new Date(json.timestamp) || new Date()
  }

  userAvatarUrl(size: number = 100): string {
    return `http://api.adorable.io/avatars/${size}/${this.userUid}.png`
  }
}
