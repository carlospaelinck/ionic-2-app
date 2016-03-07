import { Page, NavController, NavParams } from 'ionic-angular';
import { OrderFormSteps } from 'components/orderFormSteps/orderFormSteps.component';
import * as template from './orderForm.html';

@Page({
    directives: [ OrderFormSteps ],
    template
})

export class OrderForm {
    constructor(nav: NavController, params: NavParams) {
        this.nav = nav;
        this.params = params;
        this.customer = params.data.customer;
        this.activeStep = 1;
    }

    nextStep() {
        this.activeStep++;
    }

    prevStep() {
        this.activeStep--;
    }

    cancel() {
        this.nav.pop();
    }
}
