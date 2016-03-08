import { uniqueId } from 'lodash';

export default class Product {
    public id: number;
    public mino: string;
    public image: string;
    public itemNumber: string;
    public csn: string;
    public name: string;
    public price: number;

    constructor(json: Object) {
        this.id = parseInt(uniqueId(1000000), 10);
        this.mino = json.mino;
        this.image = json.image;
        this.itemNumber = json.itemNumber;
        this.csn = json.csn;
        this.name = json.name;
        this.price = json.price;
        this.selected = false;
    }
}
