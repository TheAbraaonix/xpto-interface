import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ServiceOrderService {
    public urlApi: string = "https://localhost:7009/api/service-order";
    
    constructor(private http: HttpClient) {}

    public getAll(): Observable<any> {
        return this.http.get(`${this.urlApi}/GetAllServiceOrder`);
    }
}