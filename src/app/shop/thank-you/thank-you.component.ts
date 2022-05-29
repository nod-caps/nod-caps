import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {

  orderNumber: any;

  constructor(
    private route: ActivatedRoute,
    private basket: BasketService,

  ) { }




  ngOnInit() {
    this.orderNumber = this.route.snapshot.paramMap.get('orderNumber');
    this.basket.clearBasket();
  }

}
