import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateServiceOrderComponent } from './create-service-order/create-service-order.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "create-service-order", component: CreateServiceOrderComponent}
];
