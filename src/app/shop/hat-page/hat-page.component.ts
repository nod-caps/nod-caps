import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BasketService } from 'src/app/services/basket.service';
import { FirebaseService } from 'src/app/services/fb.service';
import { BasketComponent } from 'src/app/shared/components/basket/basket.component';
import { Subscription } from 'rxjs';
import { DeliveryModalComponent } from '../delivery-modal/delivery-modal.component';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom, ]);



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
  quantity: any;
  basketSub: Subscription;
  alreadyInBasket = false;
  quantityArray = [];
  capBasketMax = 5;


  @ViewChild('swiper') swiper: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    initialSlide: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
     pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    }
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FirebaseService,
    private router: Router,
    private basket: BasketService,
private modalCtrl: ModalController,  ) { }

async openDeliveryInfo() {
  const modal = await this.modalCtrl.create({
    component: DeliveryModalComponent,
    cssClass: 'delivery-modal'
  });
  return await modal.present();
}

hoverImg(capImg: any){
  this.mainActiveCap = this.activeCap;
  this.activeCap = capImg;
}
hoverImgOut() {
this.activeCap = this.mainActiveCap;
}



makeActive(capImg: any) {
  this.activeCap = capImg;
  this.mainActiveCap = capImg;
}

  getCap(){
    this.fb.getSingleCap(this.capRef).then(data => {
      this.cap = data
      this.makeActive(this.cap.imageField1);
      this.checkQuantity();
    });
  }

  async getOtherHats() {
    this.fb.getCollectionCaps(this.collectionRef).then(data => {
      if(data) {
        this.otherCaps = data
      }
    });
  }

  quantityChanged(ev: any, index: any) {
    this.quantity = ev.detail.value;
  }

async openBasket(){
  const modal = await this.modalCtrl.create({
    component: BasketComponent,
    componentProps: {
      inModal: true
    },
    cssClass: 'basket-modal'
  });
  return await modal.present();
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

checkInBasket(){
  // subscribe to basket you muppet
  this.basketSub = this.basket.basketSub.subscribe((data) => {
    if (data) {
      data.forEach((element: any) => {
        if (element.capRef === this.capRef) {
          this.alreadyInBasket = true;
        }
      });
    }
   
  })

 
}

checkQuantity() {
  this.quantity = 1;
if (this.cap.quantity < this.capBasketMax) {
  this.quantityArray = Array.from({length:this.cap.quantity},(v,k)=>k+1)
} else {
  this.quantityArray = Array.from({length:this.capBasketMax},(v,k)=>k+1)
}

}

  ngOnInit() {
     this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');
     const capName = this.route.snapshot.paramMap.get('capNameHyphenated');
     this.capRef = this.collectionRef + '_' + capName;
    this.getCap();
    this.getOtherHats();
    this.checkInBasket();

  }

}
