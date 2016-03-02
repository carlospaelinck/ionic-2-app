import { App, Platform } from 'ionic-angular';
import { Type } from 'angular2/core';

import { IndexView } from './pages/index/index.view.ts';

@App({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    // Check out the config API docs for more info
    // http://ionicframework.com/docs/v2/api/config/Config/
    config: {}
})

export class MyApp {
    rootPage: Type = IndexView;

    constructor(platform: Platform) {
        platform.ready().then(() => {

        });
    }
}
