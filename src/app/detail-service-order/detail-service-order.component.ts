import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ServiceOrderService } from '../services/service-order.service';
import { ServiceOrderViewModel } from '../models/serviceOrder-view-model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-service-order',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  providers: [ServiceOrderService],
  templateUrl: './detail-service-order.component.html',
  styleUrl: './detail-service-order.component.css'
})
export class DetailServiceOrderComponent implements OnInit {
  public serviceOrder: ServiceOrderViewModel = new ServiceOrderViewModel();
  
  constructor(
    private route: ActivatedRoute,
    private serviceOrderService: ServiceOrderService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.serviceOrderService.getById(params["id"]).subscribe({
        next: (response: ServiceOrderViewModel) => {
          this.serviceOrder = response;
          console.log(this.serviceOrder);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    })
  }
}
