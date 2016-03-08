import { assign, find, reduce } from 'lodash';
import { Injectable } from 'angular2/core';
import { BehaviorSubject } from 'rxjs';

import Order from 'models/order.model';
import Product from 'models/product.model';
import OrderProduct from 'models/orderProduct.model';

@Injectable()
export default class OrderService {
    public order = new BehaviorSubject(new Order());

    // OrderProducts have quantity, not actual Products, assign the OrderProduct this order Id.
    addProductsToOrder(products: Product[]) {
        const orderProducts = products.map(product => new OrderProduct(assign(product, {
            orderId: this.order.id
        })));

        // push the order to subscribers along with the added Order Products
        this.order.next(assign({}, this.order.getValue(), { orderProducts }));
    }


    removeOrderProduct(orderProduct: OrderProduct) {
        const orderData = this.order.getValue();
        const orderProductInOrder = find(orderData.orderProducts, { id: orderProduct.id });
        const orderProductIndex = orderData.orderProducts.indexOf(orderProductInOrder);
        orderData.orderProducts.splice(orderProductIndex, 1);
        orderData.total = this.calculateOrderTotal(orderData);
        this.order.next(orderData);
    }

    /**
     * Updates an OrderProduct within an Order to a new quantity and updates the order
     * for the subscribers
     * @param {OrderProduct} orderProduct
     * @param {Number} newQuantity
    */
    updateOrderProductQuantity(orderProduct: OrderProduct, newQuantity: number) {
        const orderData = this.order.getValue();
        const orderProductInOrder = find(orderData.orderProducts, { id: orderProduct.id });
        const orderProductIndex = orderData.orderProducts.indexOf(orderProductInOrder);

        // update the individual quantity.
        orderData.orderProducts[orderProductIndex].quantity = newQuantity;

        // calculate total
        orderData.total = this.calculateOrderTotal(orderData);

        // notify subscribers.
        this.order.next(orderData);
    }

    calculateOrderTotal(order) {
        return reduce(order.orderProducts, (sum, product) => sum + (product.price * product.quantity), 0);
    }

}
