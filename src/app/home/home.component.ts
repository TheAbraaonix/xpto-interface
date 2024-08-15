import { Component, OnInit } from '@angular/core';
import { ServiceOrderService } from '../services/service-order.service';
import { ServiceOrderViewModel } from '../models/serviceOrder-view-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
