import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private SERECT_KEY = "SERECT_KEY";
    private _isLogin = new BehaviorSubject<boolean>(false);
    private _isAdmin = new BehaviorSubject<boolean>(false);
    public isLogin = this._isLogin.asObservable();
    public isAdmin = this._isAdmin.asObservable();

    private apiServerURL = environment.apiServerURL;
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    public getIsAdmin(): boolean {
        let result = false;
        this.isAdmin.subscribe(val => result = val);
        return result;
    }

    public getIsLogin(): boolean {
        let result = false;
        this.isLogin.subscribe(val => result = val);
        return result;
    }

    public userLogin(username: string, password: string) {
        this.login(username, password).subscribe(response => {
            if (response.accessToken) {
                const access_token = response.accessToken;
                const refresh_token = response.refreshToken;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                const helper = new JwtHelperService();
                const decodedToken = helper.decodeToken(access_token);
                const roles: [] = decodedToken.roles;
                this._isLogin.next(true);

                if (roles.length && roles.find(val => val == 'ROLE_ADMIN')) {
                    this.router.navigate(["/dashboard"]);
                    this._isAdmin.next(true);
                } else {
                    this.router.navigate(["/"]);
                }
            }
        });
    }

    public userLogout() {
        this._isLogin.next(false);
        this._isAdmin.next(false);
        // this.isLogin = this._isLogin.asObservable();
        // this.isAdmin = this._isAdmin.asObservable();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(["/"]);
    }

    private login(username: string, password: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        const options = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

        return this.http.post<any>(`${this.apiServerURL}/login`, params.toString(), options);
    }

    public getParameter(key: string): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/parameter/${key}`);
    }

    public fixTiengViet(str: string) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.trim();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
    }

}