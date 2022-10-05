import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up-holder',
  templateUrl: './sign-up-holder.component.html',
  styleUrls: ['./sign-up-holder.component.scss'],
})
export class SignUpHolderComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,

  ) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  signedUp(done: any) {
    if (done) {
      this.dismiss();
    }
  }

  ngOnInit() {
    (window as any).dataLayer.push({
      'event': 'seen-signup-popup'
     });
  }

}
