import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BasketService } from 'src/app/services/basket.service';
import { FirebaseService } from 'src/app/services/fb.service';
import { BasketComponent } from 'src/app/shared/components/basket/basket.component';
import { environment } from 'src/environments/environment';
import { getFunctions, httpsCallable } from "firebase/functions";



declare var Stripe;


@Component({
  selector: 'app-hat-page',
  templateUrl: './hat-page.component.html',
  styleUrls: ['./hat-page.component.scss'],
})
export class HatPageComponent implements OnInit {

  cap: any;
  capRef: any;
  activeCap: any;
  mainActiveCap: any;
  collectionRef: any;
  otherCaps: any;
  quantity: number= 1

  constructor(
    private route: ActivatedRoute,
    private fb: FirebaseService,
    private router: Router,
    private basket: BasketService,
private modalCtrl: ModalController,  ) { }

hoverImg(capImg: any){
  this.mainActiveCap = this.activeCap;
  this.activeCap = capImg;
}
hoverImgOut() {
this.activeCap = this.mainActiveCap;
}

makeActive(capImg: any) {
  this.activeCap = capImg;
}




goToHat(cap: any){
  this.router.navigateByUrl('shop/' + this.collectionRef + '/' + cap.nameHyphenated);
  }

  getCap(){
    this.fb.getSingleCap(this.capRef).then(data => {
      this.cap = data
      this.makeActive(this.cap.imageField1);
    });
  }

  async getOtherHats() {
    this.fb.getCollectionCaps(this.collectionRef).then(data => {
      if(data) {
        this.otherCaps = data
      }
    });
  }


  checkoutFirebase(): void {
    console.log('checking out with item id: ' + this.capRef);

    var stripe = Stripe(environment.stripe.push);
    const functions = getFunctions();
    const checkout = httpsCallable(functions, 'stripeCheckout');
    checkout({ id: this.capRef })
        .then(result => {
            console.log('hello', result);
            stripe.redirectToCheckout({
                sessionId: result.data,
            }).then((result: any) => {
                console.log(result.error.message);
            });
        });
}


  async addToBasket(cap: any) {
   this.basket.addItemToBasket(cap, this.quantity);
   const modal = await this.modalCtrl.create({
    component: BasketComponent,
    componentProps: {
      inModal: true
    },
    cssClass: 'basket-modal'
  });
  return await modal.present();

}

  ngOnInit() {
     this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');
     const capName = this.route.snapshot.paramMap.get('capNameHyphenated');
     this.capRef = this.collectionRef + '_' + capName;
    this.getCap();
    this.getOtherHats();

  }

}
