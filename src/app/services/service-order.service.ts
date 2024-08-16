import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceOrderViewModel } from "../models/serviceOrder-view-model";
import { ServiceOrderInputModel } from "../models/serviceOrder-input-model";

@Injectable({
    providedIn: 'root'
})
export class ServiceOrderService {
    public urlApi: string = "https://localhost:7009/api/service-order";
    
    constructor(private http: HttpClient) {}

    public getAll(): Observable<ServiceOrderViewModel[]> {
        return this.http.get<ServiceOrderViewModel[]>(`${this.urlApi}/GetAllServiceOrder`);
    }

    public getById(id: string): Observable<ServiceOrderViewModel> {
        return this.http.get<ServiceOrderViewModel>(`${this.urlApi}/GetServiceOrderById/${id}`);
    }

    public create(serviceOrder: ServiceOrderInputModel): Observable<ServiceOrderViewModel> {
        return this.http.post<ServiceOrderViewModel>(`${this.urlApi}/CreateServiceOrder`, serviceOrder);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${this.urlApi}/DeleteServiceOrder/${id}`);
    }
}