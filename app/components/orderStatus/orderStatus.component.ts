import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
    selector: 'order-status-badge',
    directives: [IONIC_DIRECTIVES],
    template: `
        <ion-badge secondary class="order-status-badge-{{ status.value }}">{{ status.name }}</ion-badge>
    `
})

export class OrderStatusBadge {
    @Input() status: Object;
}
