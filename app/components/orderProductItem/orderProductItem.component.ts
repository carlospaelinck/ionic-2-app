import { Component, Input } from 'angular2/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';

import OrderProduct from 'models/orderProduct.model';
import OrderService from 'services/order.service';
import * as template from './orderProductItem.html';

@Component({
    selector: 'order-product',
    directives: [ IONIC_DIRECTIVES ],
    template
})

export class OrderProductItem {
    @Input() orderProduct: OrderProduct;

    constructor(private orderService: OrderService) {}

    updateProductQuantity(newQuantity) {
        this.orderService.updateOrderProductQuantity(this.orderProduct, parseInt(newQuantity, 10));
    }

    removeProduct() {
        this.orderService.removeOrderProduct(this.orderProduct);
    }
}

