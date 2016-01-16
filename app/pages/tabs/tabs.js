import {Page} from 'ionic/ionic'
import {Page1} from '../page1/page1'
import {Page2} from '../page2/page2'
import {Page3} from '../page3/page3'

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
  constructor() {
    this.tab1Root = Page1
    this.tab2Root = Page2
    this.tab3Root = Page3
  }
}
