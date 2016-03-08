import Product from 'models/product.model';

// OrderProduct is just an instance of a Product attached to an order.
export default class OrderProduct extends Product {
    public quantity: number;

    constructor(json: Object) {
        super(json);
        this.orderId = json.orderId;
        this.quantity = json.quantity || 0;
    }
}
