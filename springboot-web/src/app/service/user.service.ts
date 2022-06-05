import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerURL = environment.apiServerURL;

    constructor(
        private http: HttpClient
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

    public getUsers(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/user/all`, this.createAuthorization());
    }

    public getMyInfo(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/user/current`, this.createAuthorization());
    }

    public getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/user/${id}`, this.createAuthorization());
    }

    public getUserByUsername(userName: string): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/user/find/userName=${userName}`);
    }

    public getUserFullNameByUsername(userName: string): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/user/find/fullname/username=${userName}`, this.createAuthorization());
    }

    public addUser(user: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/user/add`, user);
    }

    public updateUser(user: any): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/user/update`, user, this.createAuthorization());
    }

    public checkExistByUserName(userName: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/user/exist/userName`, userName);
    }
}