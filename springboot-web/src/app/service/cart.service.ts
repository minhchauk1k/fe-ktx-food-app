import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsList: any[] = [];
    constructor() { }

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
    }

    public clearItems() {
        this.itemsList = [];
    }

    public getItemsList() {
        return this.itemsList;
    }

    public clearItemById(id: string) {
        this.itemsList = this.itemsList.filter(val => {
            return val.id != id;
        });
    }

    public changeQtyById(id: string, value: number) {
        this.itemsList.forEach(val => {
            if (val.id == id) {
                val = value;
                return;
            }
        });
    }
}
