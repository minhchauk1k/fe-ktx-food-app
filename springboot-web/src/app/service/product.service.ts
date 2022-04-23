import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiServerURL = environment.apiServerURL;
    constructor(private http: HttpClient) {}

    public getAllProducts(): Observable<Product[]> {
        return this.http.get<any>(`${this.apiServerURL}/product/all`);
    }

    public addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiServerURL}/product/add`, product);
    }

    public updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiServerURL}/product/update`, product);
    }

    public deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerURL}/product/delete/${id}`);
    }
}