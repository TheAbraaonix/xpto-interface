import { Component, OnInit } from '@angular/core';
import { ServiceOrderService } from '../services/service-order.service';
import { ServiceOrderViewModel } from '../models/serviceOrder-view-model';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, DatePipe],
  providers: [ServiceOrderService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public serviceOrders: ServiceOrderViewModel[] = [];
  
  constructor(private serviceOrderService: ServiceOrderService) {}
  
  ngOnInit(): void {
    this.serviceOrderService.getAll().subscribe((response: any) => {
      this.serviceOrders = response;
    });
  }
}
