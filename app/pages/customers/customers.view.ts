import { Page } from 'ionic-angular';
import { MotionLogo } from 'components/motionLogo/motionLogo.component';
import * as template from './customers.view.html';

@Page({
    template: template,
    directives: [MotionLogo]
})

export class CustomersView {};
