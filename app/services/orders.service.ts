import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export default class OrdersService {
    constructor(
        private http: Http
    ) {}

    getOrders() {
        return this.http.get('../data/orders.json').map(response => response.json());
    }

}
