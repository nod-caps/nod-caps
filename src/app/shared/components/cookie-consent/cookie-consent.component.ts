import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { AddAnalyticsService } from 'src/app/services/add-analytics.service';
import { BasketService } from 'src/app/services/basket.service';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {


  showManageCookies = false;
  acceptAnalytics= true;

  constructor(
    private cookie: CookieService,
    private modalCtrl: ModalController,
    private addAnalytics: AddAnalyticsService,
    private signUpService: SignUpService,
    private basketService: BasketService
    ) { }

  ngOnInit() {}


  toggle(){
   this.acceptAnalytics = !this.acceptAnalytics;
  }


 

  setCookie() {
    this.cookie.set('neccessary-cookies','allowed', 365); 
    this.signUpService.firstVisit = true;
    this.basketService.useLocalStorage = true;

    setTimeout(() => {
      if (window.innerWidth < 768) {
        this.signUpService.checkSignUp();
      }
  }, 20000);

    if (this.acceptAnalytics) {
      this.cookie.set('analytics-cookies','allowed', 365); 
      this.addAnalytics.addAnalytics();
    } else {
      this.cookie.set('analytics-cookies','denied', 365); 
    }

    this.modalCtrl.dismiss();
  }

}
