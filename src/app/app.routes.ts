import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateServiceOrderComponent } from './create-service-order/create-service-order.component';
import { DetailServiceOrderComponent } from './detail-service-order/detail-service-order.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "create-service-order", component: CreateServiceOrderComponent},
    {path: "detail-service-order/:id", component: DetailServiceOrderComponent}
];
