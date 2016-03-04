import { Page } from 'ionic-angular';
import * as template from './orders.view.html';
import { OrderItem } from 'components/orderItem/orderItem.component';
import { MotionLogo } from 'components/motionLogo/motionLogo.component';
import * as orderData from 'data/orders.json';

@Page({
    template: template,
    directives: [OrderItem, MotionLogo]
})

export class OrdersView {
    constructor() {
        this.section = 'orders';
        this.orders = orderData.orders;
    }

    onPageLoaded() {
        console.log(this.orders);
    }
};
