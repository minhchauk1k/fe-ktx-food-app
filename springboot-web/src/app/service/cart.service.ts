import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsList: any[] = [];
    constructor() { }

    public addItem(item: any) {
        this.itemsList.push(item);
    }

    public clearItems(){
        this.itemsList = [];
    }

    public getItemsList(){
        return this.itemsList;
    }
}
