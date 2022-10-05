import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/fb.service';
import { SeoService } from 'src/app/services/seo.service';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-review-caps',
  templateUrl: './review-caps.component.html',
  styleUrls: ['./review-caps.component.scss'],
})
export class ReviewCapsComponent implements OnInit {


  caps: any;

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private modalCtrl: ModalController,
    private seo: SeoService
  ) { }


  async review(cap: any, index: number){
    const modal = await this.modalCtrl.create({
      component: AddReviewComponent,
      componentProps:{
        cap,
      },
      cssClass: 'review-modal'
    }).then (modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then (result => {
      if (result.data?.review) {
        this.caps[index].review = true 
      }
    })
  }

  buyAgain(cap: any) {
    this.router.navigateByUrl('shop/' + cap.collectionRef + '/' + cap.nameHyphenated);
  }


  toShop() {
    this.router.navigateByUrl('shop');
  }


  ngOnInit() {
    this.seo.generateTags({title: 'My Orders | nod caps', description:'nod caps are a small team based in Edinburgh focusing exclusively on producing quality caps for anyone to wear. Buy nod caps now. ' });
    this.seo.setRobots();

    this.getHats()
  }

  async getHats() {
    this.fb.getCollectionCaps('The-Original-Collection').then(data => {
      if(data) {
        this.caps = data
      }
    });
  }

}
