import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SignUpHolderComponent } from '../shared/components/sign-up-holder/sign-up-holder.component';


@Injectable({
  providedIn: 'root'
})
export class SignUpService{

  firstVisit = false;

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {
   }


   checkSignUp() {
      if (this.router.url.indexOf('cheers') === -1 && this.firstVisit) {
           this.showSignUp();
      }
    
   }

 
   
  async showSignUp() {
    const modal = await this.modalCtrl.create({
      component: SignUpHolderComponent,
      componentProps: {
      },
      cssClass: 'sign-up-modal'
    });
    return await modal.present();
  }

}