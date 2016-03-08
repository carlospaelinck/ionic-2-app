import { uniqueId, random } from 'lodash';
import OrderProduct from 'models/orderProduct.model';

export default class Order {
    public id: number;
    public orderProducts: OrderProduct[];
    public poNumber: string;
    public releaseNumber: string;
    public dueDate: Date;
    public carrier: string;
    public shipMethod: string;

    constructor(json: Object) {
        this.id = uniqueId('DS' + 1000000);
        this.poNumber = uniqueId('PO' + 1000000);
        this.releaseNumber = random(7777, 9999);
        this.dueDate = new Date();
        this.carrier = undefined;
        this.shipMethod = undefined;
        this.orderProducts = [];

        // gets modified during order processing.
        this.total = 0;
    }

}
