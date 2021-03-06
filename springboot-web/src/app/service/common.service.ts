import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CartService } from "./cart.service";
import { MessageService } from "primeng/api";
import { UserService } from "./user.service";
import { HeaderComponent } from "../main/core/header/header.component";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private ANONYMOUS = 'ANONYMOUS';
    private ROLE_ADMIN = 'ROLE_ADMIN';
    private ROLE_USER = 'ROLE_USER';
    private ROLE_MANAGER = 'ROLE_MANAGER';
    private ROLE_OWNER = 'ROLE_OWNER';
    private ROLE_STAFF = 'ROLE_STAFF';
    private SERECT_KEY = 'SERECT_KEY';

    private _isLogin = new BehaviorSubject<boolean>(false);
    private _isAdmin = new BehaviorSubject<boolean>(false);
    private _roleControl = new BehaviorSubject<string>(this.ANONYMOUS);
    private _user = new BehaviorSubject<any>(null);
    public isLogin = this._isLogin.asObservable();
    public isAdmin = this._isAdmin.asObservable();
    public user = this._user.asObservable();
    public roleControl = this._roleControl.asObservable();

    private apiServerURL = environment.apiServerURL;
    constructor(
        private http: HttpClient,
        private router: Router,
        private cartService: CartService,
        private messageService: MessageService,
        private userService: UserService,
    ) {
        this.checkCurrentToken();
    }

    private checkCurrentToken() {
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');
        const helper = new JwtHelperService();
        if (access_token && helper.isTokenExpired(access_token)) {
            const BEARER = 'Bearer ';
            let _headers = new HttpHeaders();
            _headers = new HttpHeaders().set('Content-Type', 'application/json');
            _headers = _headers.append("Authorization", BEARER + localStorage.getItem('refresh_token'));

            const httpOptions = {
                headers: _headers
            }

            this.http.get<any>(`${this.apiServerURL}/common/refresh_token`, httpOptions).subscribe({
                next: response => {
                    if (response.accessToken) {
                        // reset
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');

                        // set l???i value
                        this._isLogin.next(true);

                        const access_token = response.accessToken;
                        const refresh_token = response.refreshToken;
                        localStorage.setItem('access_token', access_token);
                        localStorage.setItem('refresh_token', refresh_token);

                        this.getUserInfo();

                        const decodedToken = helper.decodeToken(access_token);
                        const roles: any[] = decodedToken.roles;

                        this.sortRoleLogin(roles);

                        if (roles.length && this._roleControl.value === this.ROLE_ADMIN) {
                            this._isAdmin.next(true);
                        }
                    }
                }
            })
        } else if (access_token && !helper.isTokenExpired(access_token)) {
            this._isLogin.next(true);

            this.getUserInfo();

            const decodedToken = helper.decodeToken(access_token);
            const roles: any[] = decodedToken.roles;

            this.sortRoleLogin(roles);

            if (roles.length && this._roleControl.value === this.ROLE_ADMIN) {
                this._isAdmin.next(true);
            }
        }
    }

    public erorrHandle(): any {
        return (error: any) => {
            if (error.status == 403) {
                this.messageService.add({ severity: 'error', summary: 'X???y ra l???i truy c???p', detail: 'Vui l??ng ????ng nh???p v?? th??? l???i sau!', life: 5000 });
                this._isLogin.next(false);
                this._isAdmin.next(false);
                this._user.next(null);
                this._roleControl.next(this.ANONYMOUS)
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                this.router.navigate(['/login']);
            } else {
                this.messageService.add({ severity: 'error', summary: 'X???y ra l???i', detail: 'Vui l??ng li??n h??? qu???n tr??? vi??n!', life: 5000 });
            }
        }
    }

    public userLogin(data: { userName: string, password: string }) {
        const userName: string = data.userName;
        const password: string = data.password;
        this.login(userName, password).subscribe({
            next: response => {
                this.userService.getUserByUsername(userName).subscribe(res => {
                    if (res.blocked == true) {
                        this.messageService.add({ severity: 'error', summary: 'Th??ng b??o', detail: 'T??i kho???n ???? b??? kh??a, vui l??ng li??n h??? qu???n tr??? vi??n ????? ???????c h??? tr???' });
                    } else {
                        if (response.accessToken) {
                            this._isLogin.next(true);

                            const access_token = response.accessToken;
                            const refresh_token = response.refreshToken;
                            localStorage.setItem('access_token', access_token);
                            localStorage.setItem('refresh_token', refresh_token);

                            this.getUserInfo();

                            const helper = new JwtHelperService();
                            const decodedToken = helper.decodeToken(access_token);
                            const roles: any[] = decodedToken.roles;

                            this.sortRoleLogin(roles);

                            if (roles.length && (this._roleControl.value !== this.ANONYMOUS && this._roleControl.value !== this.ROLE_USER)) {
                                if (this._roleControl.value !== this.ROLE_STAFF) {
                                    this._isAdmin.next(true);
                                    this.router.navigate(['/admin']);
                                } else {
                                    this.router.navigate(['/order-delivery']);
                                }
                            } else {
                                this.router.navigate(['/']);
                            }
                        }
                    }
                });
            }, error: error => {
                this.messageService.add({ severity: 'error', summary: 'Th??ng b??o', detail: 'Sai t??n ????ng nh???p ho???c m???t kh???u' });
            }
        }
        );
    }

    private sortRoleLogin(arr: any[]) {
        let finalRole = arr.includes(this.ROLE_USER) ? this.ROLE_USER : this.ANONYMOUS;
        finalRole = arr.includes(this.ROLE_STAFF) ? this.ROLE_STAFF : finalRole;
        finalRole = arr.includes(this.ROLE_MANAGER) ? this.ROLE_MANAGER : finalRole;
        finalRole = arr.includes(this.ROLE_OWNER) ? this.ROLE_OWNER : finalRole;
        finalRole = arr.includes(this.ROLE_ADMIN) ? this.ROLE_ADMIN : finalRole;
        this._roleControl.next(finalRole);
    }

    private getUserInfo() {
        this.userService.getMyInfo().subscribe({
            next: response => {
                this._user.next(response);
            }
        });
    }

    public userLogout() {
        this._isLogin.next(false);
        this._isAdmin.next(false);
        this._user.next(null);
        this._roleControl.next(this.ANONYMOUS);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.cartService.clearItems();
        this.router.navigate(['/']);
    }

    private login(userName: string, password: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('userName', userName);
        params.set('password', password);
        const options = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

        return this.http.post<any>(`${this.apiServerURL}/login`, params.toString(), options);
    }

    public getParameter(key: string): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/parameter/${key}`);
    }

    public getParameters(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/parameters`);
    }

    public updateParameter(param: any): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/common/parameter/update`, param, this.createAuthorization());
    }

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

    public fixTiengViet(str: string) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.trim();
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
        str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
        str = str.replace(/??|??|???|???|??/g, 'i');
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
        str = str.replace(/???|??|???|???|???/g, 'y');
        str = str.replace(/??/g, 'd');
        return str;
    }

}