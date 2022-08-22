import { Component, OnInit } from '@angular/core';

import { ModalController} from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { BasketService } from './services/basket.service';
import { SignUpService } from './services/sign-up.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

showingCookies = false;
closedCookies = false;

  constructor(

    private cookie: CookieService,
    private modalCtrl: ModalController,
    private basketService: BasketService,
    private signUpService: SignUpService
  ) {
   }

 



  async presentModal() {
  this.showingCookies = true;
    const modal = await this.modalCtrl.create({
      component: CookieConsentComponent,
      cssClass: 'cookie-modal'
    }).then (modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then (result => {
      this.closedCookies = true;
      if (result) {
        this.showingCookies = false;
      }
    })

  }



  ngOnInit() {
   setTimeout(() => {
   const gotCookie =  this.cookie.get('consentAllowed');
   if (!gotCookie) {
    this.presentModal();
   } else if (gotCookie === 'accepted'){
    this.basketService.checkBasket();
   }
  }, 5000);

   
   setTimeout(() => {
      if (window.innerWidth < 768  && this.closedCookies) {
        this.signUpService.checkSignUp();
      }
  }, 20000);
}
}
