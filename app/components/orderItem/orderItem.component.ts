import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {OrderStatusBadge} from 'components/orderStatus/orderStatus.component';
import * as template from './orderItem.component.html';

@Component({
    selector: 'order-item',
    directives: [IONIC_DIRECTIVES, OrderStatusBadge],
    template: template
})

export class OrderItem {
    @Input() order: Object;
}
