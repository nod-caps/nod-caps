import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { myEnterFromRightAnimation } from 'src/app/animations/enter';
import { myLeaveToRightAnimation } from 'src/app/animations/leave';
import { BasketService } from 'src/app/services/basket.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  basketQuantity: number = 0;
  basketSub: Subscription;
  isOnDiv = false;
  checkedPopUp = false;

  constructor(
    private router: Router,
    private basket: BasketService,
    private signUp: SignUpService,
    private menu: MenuController,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.basketSub = this.basket.basketSub.subscribe((data) => {
      let basketLength = 0
      data.forEach(element => {
        basketLength = basketLength + element.quantity;
      });
      this.basketQuantity = basketLength
    })

    setTimeout(() => {
      const div = document.getElementById("interaction")
      div.onmouseenter = () => {
        if (!this.checkedPopUp) {
          this.signUp.checkSignUp();
          this.checkedPopUp = true;
        }
      }
    }, 500)
   
  }
  ngOnDestroy(): void {
      if (this.basketSub) {
        this.basketSub.unsubscribe();
      }
  }

  goTo(string: any){
    this.router.navigateByUrl(string);
  }

 async openBasket() {
    const modal = await this.modal.create({
      component: BasketComponent,
      cssClass: 'basket-modal',
      enterAnimation: myEnterFromRightAnimation,
      leaveAnimation: myLeaveToRightAnimation,

    }).then (modal => {
      modal.present();
    })
  }

}
