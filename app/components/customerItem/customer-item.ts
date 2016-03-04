import { Component, Input } from 'angular2/core';
import './customer-item.scss';
import Customer from 'models/customer.model.ts';

@Component({
    selector: 'customer-item',
    template: `
        <div class="customer-item">
            {{ customer.id }} <br />
            {{ customer.name }}
        </div>
    `
})

export class CustomerItem {
    @Input() customer: Customer;
}
