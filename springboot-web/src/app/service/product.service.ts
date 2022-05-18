import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiServerURL = environment.apiServerURL;
    private FOOD = 'FOOD';
    private SERVICE = 'SERVICE';
    private _headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    private createAuthorization(): any {
        this._headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._headers = this._headers.append("Authorization", 'Bearer ' + localStorage.getItem('access_token'));

        const httpOptions = {
            headers: this._headers
        }
        return httpOptions;
    }

    public getProducts(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/product/all`);
    }

    public getProductById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/product/${id}`, this.createAuthorization());
    }

    public addProduct(product: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/product/add`, product, this.createAuthorization());
    }

    public updateProduct(product: any): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/product/update`, product, this.createAuthorization());
    }

    public deleteProduct(id: number): Observable<any> {
        return this.http.delete<void>(`${this.apiServerURL}/product/delete/${id}`, this.createAuthorization());
    }

    public getProductFood(data: any[]) {
        return data.filter((val: any) => {
            return val.type == this.FOOD;
        });
    }

    public getProductFoodNotDelete(data: any[]) {
        return data.filter((val: any) => {
            return val.type == this.FOOD && val.deleted == false;
        });
    }

    public getProductService(data: any[]) {
        return data.filter((val: any) => {
            return val.type == this.SERVICE;
        });
    }

    public getProductServiceNotDelete(data: any[]) {
        return data.filter((val: any) => {
            return val.type == this.SERVICE && val.deleted == false;
        });
    }
}