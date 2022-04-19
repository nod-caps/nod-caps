import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  basketQuantity: number = 0;
  basketSub: Subscription;

  constructor(
    private router: Router,
    private basket: BasketService
  ) { }

  ngOnInit() {
    this.basketSub = this.basket.basketSub.subscribe((data) => {
      console.log('hello', data);
      let basketLength = 0
      data.forEach(element => {
        basketLength = basketLength + element.quantity;
      });
      this.basketQuantity = basketLength
    })
  }
  ngOnDestroy(): void {
      if (this.basketSub) {
        this.basketSub.unsubscribe();
      }
  }

  goTo(string: any){
    this.router.navigateByUrl(string);
  }

}
