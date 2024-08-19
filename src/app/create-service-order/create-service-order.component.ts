import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceOrderInputModel } from '../models/serviceOrder-input-model';
import { ServiceOrderService } from '../services/service-order.service';
import { ServiceOrderViewModel } from '../models/serviceOrder-view-model';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-service-order',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule, CommonModule],
  providers: [ServiceOrderService],
  templateUrl: './create-service-order.component.html',
  styleUrl: './create-service-order.component.css'
})
export class CreateServiceOrderComponent {
  public serviceNumber: number = 0;

  public newServiceOrderForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    value: new FormControl(null, [Validators.required]),
    clientCpf: new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('^[0-9]*$')]),
    clientName: new FormControl(null, [Validators.required]),
    serviceExecuterCnpj: new FormControl(null, [Validators.required, Validators.maxLength(14), Validators.minLength(14), Validators.pattern('^[0-9]*$')]),
    serviceExecuterName: new FormControl(null, [Validators.required]),
  });

  constructor(
    private serviceOrderService: ServiceOrderService,
    private router: Router
  ) { }

  public createServiceOrder(): void {
    let serviceOrder: ServiceOrderInputModel = new ServiceOrderInputModel();
    serviceOrder.serviceNumber = this.generateRandomServiceOrderNumber();
    serviceOrder.serviceTitle = this.newServiceOrderForm.get('title')?.value;
    serviceOrder.serviceDate = this.newServiceOrderForm.get('date')?.value;
    serviceOrder.serviceValue = this.newServiceOrderForm.get('value')?.value;
    serviceOrder.client.cpf = this.newServiceOrderForm.get('clientCpf')?.value;
    serviceOrder.client.name = this.newServiceOrderForm.get('clientName')?.value;
    serviceOrder.serviceExecuter.cnpj = this.newServiceOrderForm.get('serviceExecuterCnpj')?.value;
    serviceOrder.serviceExecuter.name = this.newServiceOrderForm.get('serviceExecuterName')?.value;

    this.serviceNumber = serviceOrder.serviceNumber;

    this.serviceOrderService.create(serviceOrder).subscribe({
      next: (response: ServiceOrderViewModel) => {
      }
    });
  }

  public generateRandomServiceOrderNumber(): number {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  public onlyAllowNumbers(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  public success(): void {
    this.newServiceOrderForm.reset();
    this.router.navigate(["/"]);
  }
}
