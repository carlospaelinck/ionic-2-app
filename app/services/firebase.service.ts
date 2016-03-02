import { Injectable } from 'angular2/core';
import * as Firebase from 'firebase';

@Injectable()
export default class FirebaseService {
    constructor() {
        this.rootRef = new Firebase('https://carlosionicapp.firebaseio.com');
    }
}
