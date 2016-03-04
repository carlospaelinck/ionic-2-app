import { Page, NavController } from 'ionic-angular';
import { MotionLogo } from 'components/motionLogo/motionLogo.component';
import * as template from './transaction.view.html';

@Page({
     template: template,
     directives: [MotionLogo]
})

export class TransactionView {
  constructor(public nav: NavController) {}

  close() {
      this.nav.pop();
  }

}
