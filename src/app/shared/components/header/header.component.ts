import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { SignUpService } from 'src/app/services/sign-up.service';

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
    private menu: MenuController
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
    }, 5000)
   
  }
  ngOnDestroy(): void {
      if (this.basketSub) {
        this.basketSub.unsubscribe();
      }
  }

  goTo(string: any){
    this.router.navigateByUrl(string);
  }

  openBasket() {
    this.menu.open('custom');
  }

}
