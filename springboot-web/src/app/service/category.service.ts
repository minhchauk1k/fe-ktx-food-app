import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiServerURL = environment.apiServerURL;
    private FOOD = 'FOOD';
    private SERVICE = 'SERVICE';
    private BEARER = 'Bearer ';
    private _headers = new HttpHeaders();

    private createAuthorization(): any {
        this._headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._headers = this._headers.append("Authorization", this.BEARER + localStorage.getItem('access_token'));

        const httpOptions = {
            headers: this._headers
        }
        return httpOptions;
    }

    constructor(private http: HttpClient) { }

    public getCategorysFood(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/categorys/${this.FOOD}`);
    }

    public getCategorysService(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/categorys/${this.SERVICE}`);
    }
}