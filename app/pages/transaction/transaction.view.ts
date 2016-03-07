import { groupBy, sortBy } from 'lodash';
import { Page, NavController, Modal } from 'ionic-angular';
import { MotionLogo } from 'components/motionLogo/motionLogo.component';
import { CustomerItem } from 'components/customerItem/customer-item.ts';
import { LocationSelector } from 'components/locationSelector/locationSelector.component';
import { OrderForm } from 'components/orderForm/orderForm.component';
import * as template from './transaction.view.html';
import * as customerData from 'data/customers.json';

@Page({
     template: template,
     directives: [ MotionLogo, LocationSelector, CustomerItem ]
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

    onCustomerSelect(customer) {
        let orderFlowModal = Modal.create(OrderForm, { customer });
        this.nav.present(orderFlowModal);
    }

    close() {
        this.nav.pop();
    }
}
