import { groupBy, sortBy } from 'lodash';
import { Page, NavController } from 'ionic-angular';
import { MotionLogo } from 'components/motionLogo/motionLogo.component';
import * as template from './transaction.view.html';
import * as customerData from 'data/customers.json';

@Page({
     template: template,
     directives: [MotionLogo]
})

export class TransactionView {
    constructor(nav: NavController) {
        this.shouldHideCancel = false;

        this.nav = nav;

        // group customers by their starting letter
        this.customers = groupBy(customerData.customers, (customer) => customer.name[0]);

        // get the keys, sort
        this.customersKeys = sortBy(Object.keys(this.customers));
    }

    onInput(e) {
        console.log(e);
    }

    onCancel(e) {
        console.log(e);
    }

    close() {
        this.nav.pop();
    }
}
