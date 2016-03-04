import { Injectable } from 'angular2/core';
import { Subject, BehaviorSubject } from 'rxjs';

import Customer from 'models/customer.model.ts';
import * as customersJson from 'data/customers.json';

@Injectable()
export default class CustomerService {
    public customers: Subject<Customer[]> = new BehaviorSubject<Customer[]>([]);

    downloadCustomers() {
        const customers: Customer[] = customersJson.customers
            .map(json => new Customer(json));

        this.customers.next(customers);
    }
}
