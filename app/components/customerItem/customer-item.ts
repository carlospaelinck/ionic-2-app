import { Component, Input } from 'angular2/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';

import * as template from './customer-item.html';
import Customer from 'models/customer.model.ts';

import './customer-item.scss';

@Component({
    selector: 'customer-item',
    directives: [ IONIC_DIRECTIVES ],
    template
})

export class CustomerItem {
    @Input() customer: Customer;
    @Input() showFinancialStats: boolean = false;
}
