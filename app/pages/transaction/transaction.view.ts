import { Page, NavController } from 'ionic-angular';
import * as template from './transaction.view.html';

@Page({
     template: template
})

export class TransactionView {
  constructor(public nav: NavController) {}

  close() {
      this.nav.pop();
  }

}
