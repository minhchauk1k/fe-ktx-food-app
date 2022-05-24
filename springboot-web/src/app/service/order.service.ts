import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiServerURL = environment.apiServerURL;
    private FOOD = 'FOOD';
    private SERVICE = 'SERVICE';
    private BEARER = 'Bearer ';
    private _headers = new HttpHeaders();

    constructor(private http: HttpClient) { }

    private createAuthorization(): any {
        this._headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._headers = this._headers.append("Authorization", this.BEARER + localStorage.getItem('access_token'));

        const httpOptions = {
            headers: this._headers
        }
        return httpOptions;
    }

    public addOrder(order: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/order/add`, order, this.createAuthorization());
    }

    public getOrders(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/all`, this.createAuthorization());
    }

    public changeStatusOrder(id: number, status: string): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/order/update/status/id=${id}&status=${status}`, null, this.createAuthorization());
    }

    public getOrdersJustPaid(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/all/just/paid`, this.createAuthorization());
    }

    public getOrdersJustRepaired(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/all/just/repaired`, this.createAuthorization());
    }

    public getOrdersJustDelivered(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/all/just/delivered`, this.createAuthorization());
    }

    public deliveryOrders(idList: any[]): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/order/update/delivery`, idList, this.createAuthorization());
    }

    public completeOrders(idList: any[]): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/order/update/complete`, idList, this.createAuthorization());
    }

    public getOrderLots(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/lot/all`, this.createAuthorization());
    }

    public getLotsInCompleted(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/lot/all/incompleted`, this.createAuthorization());
    }
    
}