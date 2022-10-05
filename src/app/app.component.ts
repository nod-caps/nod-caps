import { Component, OnInit } from '@angular/core';

import { ModalController} from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { BasketService } from './services/basket.service';
import { SignUpService } from './services/sign-up.service';
import { AddAnalyticsService } from './services/add-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

closedCookies = false;

  constructor(

    private cookie: CookieService,
    private modalCtrl: ModalController,
    private basketService: BasketService,
    private signUpService: SignUpService,
    private addAnalytics: AddAnalyticsService
  ) {
   }

 



  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: CookieConsentComponent,
      cssClass: 'cookie-modal',
      backdropDismiss: false
    }).then (modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then (result => {
      if (result) {
        this.closedCookies = true;
      }
    })

  }



  ngOnInit() {
   const gotCookie =  this.cookie.get('neccessary-cookies');
   if (!gotCookie) {
    this.presentModal();
   } else if (gotCookie === 'allowed') {
    this.basketService.checkBasket();
    const gotAnalyticsCookie =  this.cookie.get('analytics-cookies');
    if (gotAnalyticsCookie) {
      this.addAnalytics.addAnalytics();
    }

   }

   

}
}
