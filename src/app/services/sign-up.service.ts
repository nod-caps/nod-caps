import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { SignUpHolderComponent } from '../shared/components/sign-up-holder/sign-up-holder.component';


@Injectable({
  providedIn: 'root'
})
export class SignUpService{

  constructor(
    private modalCtrl: ModalController,
    private cookie: CookieService,
    private router: Router
  ) {
   }


   checkSignUp() {
    const route = this.router.url;
    const gotCookie =  this.cookie.get('shownPopUp');
    if (!gotCookie && route.indexOf('cheers') === -1  && route.indexOf('basket') === -1) {
         this.showSignUp();
    }
   }

 
   
  async showSignUp() {
    const modal = await this.modalCtrl.create({
      component: SignUpHolderComponent,
      componentProps: {
        // inModal: true
      },
      cssClass: 'sign-up-modal'
    });
    return await modal.present();
  }

}