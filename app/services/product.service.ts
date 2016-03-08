import { Injectable } from 'angular2/core';
import { Subject, BehaviorSubject } from 'rxjs';

import Product from 'models/product.model.ts';
import * as productsJson from 'data/products.json';

@Injectable()
export default class ProductService {
    public products: Subject<Product[]> = new BehaviorSubject<Product[]>([]);

    downloadProducts() {
        const products: Product[] = productsJson.products.map(json => new Product(json));
        console.log(products);
        this.products.next(products);
    }
}
