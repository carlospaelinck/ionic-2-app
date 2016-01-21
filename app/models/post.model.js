const moment = require('moment')

export default class Post {
  id: string
  userUid: string
  userName: string
  content: string
  date: Date
  favorites: string[]

  constructor(id, json) {
    this.id = id || ''
    this.userUid = json.userUid || ''
    this.userName = json.userName || ''
    this.content = json.content || ''
    this.date = new Date(json.timestamp) || new Date()
    this.favorites = json.favorites || []
  }

  userAvatarUrl(size: number = 100): string {
    return `http://api.adorable.io/avatars/${size}/${this.userUid}.png`
  }

  formattedDate(): string {
    const isToday = moment().isSame(this.date, 'day')
    return moment(this.date).format(isToday ? 'hA' : 'MMM D')
  }
}
