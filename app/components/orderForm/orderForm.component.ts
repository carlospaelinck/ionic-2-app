import { filter } from 'lodash';
import { Page, NavController, NavParams } from 'ionic-angular';
import { OrderFormSteps } from 'components/orderFormSteps/orderFormSteps.component';
import { OrderProductItem } from 'components/orderProductItem/orderProductItem.component';
import { OrderTotalFooter } from 'components/orderTotalFooter/orderTotalFooter.component';

import ProductService from 'services/product.service';
import Product from 'models/product.model.ts';

import OrderService from 'services/order.service';

import * as template from './orderForm.html';

@Page({
    directives: [
        OrderFormSteps,
        OrderProductItem,
        OrderTotalFooter
    ],
    template
})

export class OrderForm {
    private products: Product[] = [];

    constructor(
        private nav: NavController,
        private params: NavParams,
        private productService: ProductService,
        private ordersService: OrderService)
    {
        this.customer = params.data.customer;
        this.activeStep = 1;
        this.productService.downloadProducts();
        this.productService.products.subscribe(products => this.products = products);

        // create a new Order, and subscribe to it's updates.
        this.ordersService.order.subscribe(order => {
            console.log('subscribe order', order);
            this.order = order;
        });
    }

    onProductSelect(product) {
        console.log(product);
    }

    nextStep() {
        switch (this.activeStep) {
            case 1:
                const selectedProducts = filter(this.products, { selected: true });
                this.ordersService.addProductsToOrder(selectedProducts);
            default:
                this.activeStep++;
        }
    }

    prevStep() {
        this.activeStep--;
    }

    cancel() {
        this.nav.pop();
    }
}
