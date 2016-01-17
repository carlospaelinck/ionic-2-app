import {Page} from 'ionic/ionic'
import {FeedView} from '../feed/feed.view'
import {MeView} from '../me/me.view'
import {PeopleView} from '../people/people.view'

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
  constructor() {
    this.tabFeedView = FeedView
    this.tabMeView = MeView
    this.tabPeopleView = PeopleView
  }
}
