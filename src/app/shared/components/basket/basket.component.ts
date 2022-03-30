import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {

  @Input() inModal = false
  basketSub: Subscription;
  basketArray: any;
  basketLength = 0;
  totalPrice = 0;
  constructor(
    private basket: BasketService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }


quantityChanged(ev: any, index: any){
//getting called twice as changing in here
this.basketArray[index].quantity = ev.detail.value;
this.basketArray[index].itemPrice = ev.detail.value* this.basketArray[index].cap.price;
this.getTotalPrice();
this.basket.editBasket();
}

remove(index: any){
  this.basketArray.splice(index, 1);
  this.getTotalPrice();
  this.basket.editBasket();
}

getTotalPrice(){
  this.totalPrice = 0;
  this.basketArray.forEach((item:any, index: any) => {
    this.totalPrice += item.itemPrice; 
  });
}

editBasket() {
  this.modalCtrl.dismiss();
  this.router.navigateByUrl('basket');

}

  ngOnInit() {
    //do i need to subscribe here
  this.basket.basketSub.subscribe((data) => {
    this.totalPrice= 0
      this.basketArray = data;
      this.basketArray.forEach((item:any, index: any) => {
        this.basketArray[index].itemPrice = item.quantity * item.cap.price;
        this.totalPrice += this.basketArray[index].itemPrice;
      });
      console.log('hello', this.basketArray);
    })
  }
  ngOnDestroy(): void {
    if (this.basketSub) {
      this.basketSub.unsubscribe();
    }
}

}

