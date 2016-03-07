import { Component, Input } from 'angular2/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';

import * as template from './locationSelector.component.html';
import * as locationsData from 'data/locations.json';

@Component({
    selector: 'location-selector',
    directives: [ IONIC_DIRECTIVES ],
    template
})

export class LocationSelector {
    @Input() selectedLocation;

    public locations = locationsData.locations;
    public alertOptions = {
        title: 'Select Location',
        subTitle: 'Select a Location to view Customers'
    };


}
