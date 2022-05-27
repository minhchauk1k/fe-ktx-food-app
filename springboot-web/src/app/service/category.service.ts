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

    public getCategories(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/category/all`);
    }

    public getCategoriesFood(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/category/${this.FOOD}`);
    }

    public getCategoriesService(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/category/${this.SERVICE}`);
    }

    public getAddresses(): Observable<any> {
        return this.http.get<any>(`${this.apiServerURL}/common/address/all`);
    }
}