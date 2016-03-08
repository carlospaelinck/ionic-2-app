import { Component } from 'angular2/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';

import OrderService from 'services/order.service';

@Component({
    selector: 'order-total-footer',
    directives: [ IONIC_DIRECTIVES ],
    template: `
        <ion-toolbar position="bottom">
            <ion-row>
                <ion-col width-75>
                    <h4>Total</h4>
                    <p>Tax and freight not included</p>
                </ion-col>
                <ion-col class="total">
                    <h4>{{ order.total | currency: 'USD': true }}</h4>
                </ion-col>
            </ion-row>
        </ion-toolbar>
    `
})

export class OrderTotalFooter {
    // @Input() orderProduct: OrderProduct;
    public total = 321.23;

    constructor(private ordersService: OrderService) {
        // create a new Order, and subscribe to it's updates.
        this.ordersService.order.subscribe(order => {
            console.log('subscribe order from total component', order);
            this.order = order;
        });
    }
}


