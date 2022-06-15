import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiServerURL = environment.apiServerURL;
    private FOOD = 'FOOD';
    private SERVICE = 'SERVICE';

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
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

    public getCategories(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/category/all`);
    }

    public getCategoriesFood(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/category/${this.FOOD}`);
    }

    public getCategoriesService(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/category/${this.SERVICE}`);
    }

    public addCategory(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerURL}/common/category/add`, data, this.createAuthorization());
    }

    public updateCategory(data: any): Observable<any> {
        return this.http.put<any>(`${this.apiServerURL}/common/category/update`, data, this.createAuthorization());
    }

    public deleteCategory(id: number): Observable<any> {
        return this.http.delete<void>(`${this.apiServerURL}/common/category/delete/${id}`, this.createAuthorization());
    }
}