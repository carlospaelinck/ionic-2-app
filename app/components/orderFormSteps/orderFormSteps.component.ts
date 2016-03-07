import { Component, Input } from 'angular2/core';
import * as template from './orderFormSteps.html';


@Component({
    selector: 'order-form-steps',
    template

})
export class OrderFormSteps {
    @Input() activeStep: number = 1;

    nextStep() {
        this.activeStep++;
    }

    prevStep() {
        this.activeStep--;
    }
}
