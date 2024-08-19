import { Component, OnInit } from '@angular/core';
import { ServiceOrderService } from '../services/service-order.service';
import { ServiceOrderViewModel } from '../models/serviceOrder-view-model';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, DatePipe, RouterModule],
  providers: [ServiceOrderService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public serviceOrders: ServiceOrderViewModel[] = [];
  public selectedServiceOrder: any;
  
  constructor(private serviceOrderService: ServiceOrderService) {}
  
  ngOnInit(): void {
    this.serviceOrderService.getAll().subscribe((response: any) => {
      this.serviceOrders = response.sort((a: ServiceOrderViewModel, b: ServiceOrderViewModel) => {
        return String(a.serviceNumber).localeCompare(String(b.serviceNumber));
      });
    });
  }

  public delete(id: string): void {
    this.serviceOrderService.delete(id).subscribe((response: any) => {
      const deleteModal = document.getElementById('deleteModal');

      if (deleteModal) {
        const modal = bootstrap.Modal.getOrCreateInstance(deleteModal);
        modal?.hide();
      }

      document.body.classList.remove('modal-open');
      document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
      window.location.reload();
    });
  }

  public openDeleteModal(serviceOrder: any): void {
    this.selectedServiceOrder = serviceOrder;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(deleteModal);
      modal?.show();
    }
  }
}
