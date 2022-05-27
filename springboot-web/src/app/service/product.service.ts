import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiServerURL = environment.apiServerURL;

    constructor(
        private http: HttpClient,
    ) { }

    private createAuthorization(): any {
        const BEARER = 'Bearer ';
        let _headers = new HttpHeaders();
        _headers = new HttpHeaders().set('Content-Type', 'application/json');
        _headers = _headers.append("Authorization", BEARER + localStorage.getItem('access_token'));

        const httpOptions = {
            headers: _headers
        }
        return httpOptions;
    }

    public getProductsByTypeAndIsDelete(param: any): Observable<any> {
        const type = param.type;
        const isDelete = param.delete;
        return this.http.get<any>(`${this.apiServerURL}/product/all/type=${type}&isDelete=${isDelete}`);
    }

    public getProductsByIsDelete(isDelete: boolean): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/product/all/isDelete=${isDelete}`);
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
}