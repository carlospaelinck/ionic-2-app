import { App, Platform } from 'ionic-angular';
import { IndexView } from 'pages/index/index.view.ts';
// import { OrdersService } from 'services/orders.service';
import CustomerService from 'services/customer.service.ts';

@App({
    template: `
         <ion-nav [root]="rootPage"></ion-nav>
    `,
    config: {
        tabbarPlacement: 'bottom'
    },
    providers: [
        CustomerService
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
