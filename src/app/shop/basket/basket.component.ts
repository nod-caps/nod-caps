import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {

  basketSub: Subscription;
  basketArray: any;
  basketLength = 0;
  constructor(
    private basket: BasketService
  ) { }

  ngOnInit() {
    this.basketSub = this.basket.basketSub.subscribe((data) => {
        
      this.basketArray = data;
      console.log('hello', data);
    })
  }
  ngOnDestroy(): void {
    if (this.basketSub) {
      this.basketSub.unsubscribe();
    }
}

}

