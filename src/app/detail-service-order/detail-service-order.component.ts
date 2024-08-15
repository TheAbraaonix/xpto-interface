import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-detail-service-order',
  standalone: true,
  imports: [],
  templateUrl: './detail-service-order.component.html',
  styleUrl: './detail-service-order.component.css'
})
export class DetailServiceOrderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params["id"]);
    })
  }
}
