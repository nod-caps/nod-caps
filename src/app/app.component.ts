import { Component, HostListener, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreensizeService } from './services/screensize.service';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screensizeService: ScreensizeService,
    private cookie: CookieService,
    private modalCtrl: ModalController,
    private basketService: BasketService
  ) {
   }

 

  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.screensizeService.onResize(event.target.innerWidth);
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: CookieConsentComponent,
      cssClass: 'cookie-modal'
    });
    return await modal.present();
  }


  ngOnInit() {
   const gotCookie =  this.cookie.get('consentAllowed');
   if (!gotCookie) {
    this.presentModal();
   } else if (gotCookie === 'accepted'){
    this.basketService.checkBasket();
   } else if (gotCookie === 'rejected') {
     this.basketService.clearBasket();
   }
  }
}
