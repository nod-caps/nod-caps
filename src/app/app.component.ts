import { Component, HostListener, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreensizeService } from './services/screensize.service';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { BasketService } from './services/basket.service';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { SignUpHolderComponent } from './shared/components/sign-up-holder/sign-up-holder.component';
import { SignUpService } from './services/sign-up.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

showingCookies = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screensizeService: ScreensizeService,
    private cookie: CookieService,
    private modalCtrl: ModalController,
    private basketService: BasketService,
    private signUpService: SignUpService
  ) {
   }

 

  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.screensizeService.onResize(event.target.innerWidth);
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
      if (result) {
        this.showingCookies = false;
      }
    })

  }



  ngOnInit() {
   const gotCookie =  this.cookie.get('consentAllowed');
   if (!gotCookie) {
    this.presentModal();
   } else if (gotCookie === 'accepted'){
    this.basketService.checkBasket();
   }

   
   setTimeout(() => {
      if (window.innerWidth < 768) {
        this.signUpService.checkSignUp();
      }
  }, 20000);
}
}
