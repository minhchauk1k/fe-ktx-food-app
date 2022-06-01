import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
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

    public groupBy = (items: any[], key: string) => {
        return items.reduce((item, properties) => {
            (item[properties[key]] = item[properties[key]] || []).push(properties);
            return item;
        }, {});
    };

    public getAddresses(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/address/all`);
    }

    public getByType(type: string): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/address/all/type=${type}`);
    }

    public addAddress(address: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/common/address/add`, address, this.createAuthorization());
    }

}