import { App, Platform } from 'ionic-angular';
import { IndexView } from 'pages/index/index.view.ts';

@App({
    template: `
         <ion-nav [root]="rootPage"></ion-nav>
    `,
    config: {
        tabbarPlacement: 'bottom'
    }
})

export class MotionApp {
    rootPage: Type = IndexView;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            console.log('platform ready');
        });
    }
}
