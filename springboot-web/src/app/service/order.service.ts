import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
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

    public addOrder(order: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/order/add`, order, this.createAuthorization());
    }

    public addOrderLot(orderLot: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/order/lot/add`, orderLot, this.createAuthorization());
    }

    public getOrders(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/all`, this.createAuthorization());
    }

    public getOrdersOfUser(param: any): Observable<any> {
        const status = param.status;
        const dateFrom = param.dateFrom;
        const dateTo = param.dateTo;
        return this.http.get<any>(`${this.apiServerURL}/order/all/user/status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`, this.createAuthorization());
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

    public getOrderLotsJustRepaired(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/lot/all/just/repaired`, this.createAuthorization());
    }

    public deliveryLot(id: number): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/order/lot/update/delivery`, id, this.createAuthorization());
    }

    public getOrderOfThisWeek(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/report/week`, this.createAuthorization());
    }

    public getOrderOfLastWeek(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/order/report/last/week`, this.createAuthorization());
    }

}