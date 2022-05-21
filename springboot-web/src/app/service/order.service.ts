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
}