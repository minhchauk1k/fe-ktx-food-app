import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private apiServerURL = environment.apiServerURL;
    constructor(private http: HttpClient) {}

    public login(username: string, password: string): Observable<any> {
        const params= new URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        const options = { headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

        return this.http.post<any>(`${this.apiServerURL}/login`, params.toString(), options);
    }

    public getParameter(key: string):Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/parameter/${key}`);
    }

}