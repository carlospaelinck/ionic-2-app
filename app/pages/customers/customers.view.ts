import { Page } from 'ionic-angular';
import { MotionLogo } from 'components/motionLogo/motionLogo.component';

import CustomerService from 'services/customer.service.ts';
import Customer from 'models/customer.model.ts';

import * as template from './customers.view.html';

@Page({
    template: template,
    directives: [ MotionLogo ]
})

export class CustomersView {
    private customers: Customer[] = [];

    constructor(
        private customerService: CustomerService
    ) {
        this.customerService.downloadCustomers();
        this.customerService.customers.subscribe(customers => this.customers = customers);
    }
}
