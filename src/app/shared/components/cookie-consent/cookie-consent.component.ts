import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {

  constructor(
    private cookie: CookieService,
    private basketService: BasketService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  close () { 
    this.modalCtrl.dismiss();
  }

  setCookie(message: string) {
    this.cookie.set('consentAllowed', message, 365); 
    if (message === 'allowed') {
      this.basketService.useLocalStorage  = true;
    } else if (message ==='rejected') {
      this.basketService.clearBasket();
    }
    this.modalCtrl.dismiss();
  }

}
