export default class Customer {
    public id: number;
    public name: string;
    public favorite: boolean;
    public monthToDate: number;
    public yearToDate: number;

    constructor(json: Object) {
        this.id = json.id || 0;
        this.name = json.name || '';
        this.favorite = json.favorite || false;
        this.monthToDate = json.mtd || 0;
        this.yearToDate = json.ytd || 0;
    }
}
