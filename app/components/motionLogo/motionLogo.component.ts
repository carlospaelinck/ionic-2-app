import {Component} from 'angular2/core';
import * as logoPath from 'assets/motion-logo.png';

@Component({
    selector: 'motion-logo',
    template: '<img [src]="path">'
})
export class MotionLogo {
    constructor() {
        this.path = `build/js/${logoPath}`;
    }
}
