import * as moment from 'moment'
import * as md5 from 'md5'

export default class Post {
  id: string
  userUid: string
  hash: string
  userName: string
  content: string
  date: Date
  favorites: string[]

  constructor(id, json) {
    this.id = id || ''
    this.userUid = json.userUid || ''
    this.userName = json.userName || ''
    this.content = json.content || ''
    this.hash = md5(this.userName)
    this.date = new Date(json.timestamp) || new Date()
    this.favorites = json.favorites || []
    this.favoriteIcon
  }

  userAvatarUrl(size: number = 100): string {
    return `http://www.gravatar.com/avatar/${this.hash}?d=retro&s=${size}`
  }

  isFavoritedByUser(uid: string): boolean {
    return this.favorites.indexOf(uid) !== -1
  }

  formattedDate(): string {
    const isToday = moment().isSame(this.date, 'day')
    return moment(this.date).format(isToday ? 'hA' : 'MMM D')
  }
}
