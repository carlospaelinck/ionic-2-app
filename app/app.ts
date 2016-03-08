import { App, Platform } from 'ionic-angular';
import { IndexView } from 'pages/index/index.view.ts';
// import { OrdersService } from 'services/orders.service';
import CustomerService from 'services/customer.service.ts';
import ProductService from 'services/product.service.ts';
import OrderService from 'services/order.service.ts';

@App({
    template: `
         <ion-nav [root]="rootPage"></ion-nav>
    `,
    config: {
        tabbarPlacement: 'bottom'
    },
    providers: [
        CustomerService,
        ProductService,
        OrderService
    ]
})

export class MotionApp {
    rootPage: Type = IndexView;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            console.log('platform ready');
        });
    }
}
