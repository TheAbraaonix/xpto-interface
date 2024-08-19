import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { ServiceOrderService } from '../services/service-order.service';
import { ServiceOrderViewModel } from '../models/serviceOrder-view-model';
import { CommonModule, CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import * as bootstrap from 'bootstrap'; 
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceOrderUpdateInputModel } from '../models/serviceOrder-update-input-model';

@Component({
  selector: 'app-detail-service-order',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule, NgIf, FormsModule, CommonModule],
  providers: [ServiceOrderService, DatePipe],
  templateUrl: './detail-service-order.component.html',
  styleUrl: './detail-service-order.component.css'
})
export class DetailServiceOrderComponent implements OnInit {
  public serviceOrder: ServiceOrderViewModel = new ServiceOrderViewModel();
  public updateForm: FormGroup;
  private initialFormValue: any;
  
  constructor(
    private route: ActivatedRoute,
    private serviceOrderService: ServiceOrderService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.updateForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      clientCpf: new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('^[0-9]*$')]),
      clientName: new FormControl(null, [Validators.required]),
      serviceExecuterCnpj: new FormControl(null, [Validators.required, Validators.maxLength(14), Validators.minLength(14), Validators.pattern('^[0-9]*$')]),
      serviceExecuterName: new FormControl(null, [Validators.required]),
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.serviceOrderService.getById(params["id"]).subscribe({
        next: (response: ServiceOrderViewModel) => {
          this.serviceOrder = response;
          const covertedDate = this.datePipe.transform(this.serviceOrder.serviceDate, "yyyy-MM-dd");
          
          this.updateForm.setValue({
            title: this.serviceOrder.serviceTitle,
            date: covertedDate,
            value: this.serviceOrder.serviceValue,
            clientCpf: this.serviceOrder.client.cpf,
            clientName: this.serviceOrder.client.name,
            serviceExecuterCnpj: this.serviceOrder.serviceExecuter.cnpj,
            serviceExecuterName: this.serviceOrder.serviceExecuter.name
          });

          this.initialFormValue = this.updateForm.value;
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

  isFormUnchanged(): boolean {
    return JSON.stringify(this.initialFormValue) === JSON.stringify(this.updateForm.value);
  }

  update(): void {
    let serviceOrderUpdateInputModel = new ServiceOrderUpdateInputModel();
    serviceOrderUpdateInputModel.serviceTitle = this.updateForm.value.title;
    serviceOrderUpdateInputModel.serviceDate = this.updateForm.value.date;
    serviceOrderUpdateInputModel.serviceValue = this.updateForm.value.value;
    serviceOrderUpdateInputModel.serviceNumber = this.serviceOrder.serviceNumber;
    serviceOrderUpdateInputModel.client.id = this.serviceOrder.client.id;
    serviceOrderUpdateInputModel.client.cpf = this.updateForm.value.clientCpf;
    serviceOrderUpdateInputModel.client.name = this.updateForm.value.clientName;
    serviceOrderUpdateInputModel.serviceExecuter.id = this.serviceOrder.serviceExecuter.id;
    serviceOrderUpdateInputModel.serviceExecuter.cnpj = this.updateForm.value.serviceExecuterCnpj;
    serviceOrderUpdateInputModel.serviceExecuter.name = this.updateForm.value.serviceExecuterName;

    this.serviceOrderService.update(this.serviceOrder.id, serviceOrderUpdateInputModel).subscribe({
      next: (response: any) => {
      },
      error: (error: any) => {
        console.log(error);
      }});
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
    this.updateForm.reset();
    this.router.navigate(["/"]);
  }
}
