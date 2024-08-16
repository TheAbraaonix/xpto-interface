import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { ServiceOrderService } from '../services/service-order.service';
import { ServiceOrderViewModel } from '../models/serviceOrder-view-model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import * as bootstrap from 'bootstrap'; 

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
    private serviceOrderService: ServiceOrderService,
    private router: Router
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

  delete(): void {
    this.serviceOrderService.delete(this.serviceOrder.id).subscribe({
      next: (response: any) => {
        const deleteModel = document.getElementById("deleteModel");

        if (deleteModel) {
          const modal = new bootstrap.Modal(deleteModel);
          modal.hide();
        }

        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
        this.router.navigate(["/"]);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
