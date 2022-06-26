import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsList: any[] = [];
    constructor() { 
        this.checkCartInLocalStored();
    }

    private resetCartLocalStored() {
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(this.itemsList));
    }

    private checkCartInLocalStored() {
        const localCartStr = localStorage.getItem('cart');
        if (localCartStr != null) {
            const localCart = JSON.parse(localCartStr);
            this.itemsList = localCart;
        } else {
            this.resetCartLocalStored();
        }
    }

    public addItem(item: any) {
        let myFlag = false;
        // increase if exist
        this.itemsList.forEach(val => {
            if (val.id == item.id) {
                val.qty += 1;
                myFlag = true;
                return;
            }
        });

        // add new if not exist
        if (myFlag == false) {
            this.itemsList.push(item);
        }
        this.resetCartLocalStored();
    }

    public clearItems() {
        this.itemsList = [];
        this.resetCartLocalStored();
    }

    public getItemsList() {
        return this.itemsList;
    }

    public clearItemById(id: string) {
        this.itemsList = this.itemsList.filter(val => {
            return val.id != id;
        });
        this.resetCartLocalStored();
    }

    public changeQtyById(id: string, value: number) {
        this.itemsList.forEach(val => {
            if (val.id == id) {
                val = value;
                return;
            }
        });
        this.resetCartLocalStored();
    }
}
