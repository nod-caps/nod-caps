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
import { AddReviewComponent } from '../../shared/components/add-review/add-review.component';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { SeoService } from 'src/app/services/seo.service';
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
  capReviews: any;
  mainActiveCap: any;
  collectionRef: any;
  otherCaps: any;
  quantity: any;
  basketSub: Subscription;
  alreadyInBasket = false;
  quantityArray = [];
  capBasketMax = 5;
  loadReviews = false;
  displayRating  = 5;
  wholeStars = 5;
  hasHalf = false;


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
private modalCtrl: ModalController,
private firestore: Firestore,
private seo: SeoService  ) { }

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
      this.cap = data;
      if (this.cap.rating) {
        this.displayRating = Math.round(this.cap.rating*2) / 2;
        this.wholeStars = Math.floor(this.displayRating);
        this.hasHalf = this.displayRating.toString().indexOf('.') > -1;
      }
      this.makeActive(this.cap.imageField1);
      this.checkQuantity();
      this.seo.generateTags({title: 'Nod Caps - ' + this.cap.name, description: this.cap.name, image: this.cap.imageField1 });
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
    this.checkOnScreen();
    this.checkOnScreenLearn();

  }

  checkOnScreen(){
    const reviews = document.querySelector('.reviews');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.loadReviews = true;
          observer.unobserve(entry.target);
        } 
      });
    });
    observer.observe(reviews);
  }

  checkOnScreenLearn(){
    const learn = document.querySelector('.learn-more');
    const other = document.querySelector('.other-info');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          learn.classList.add('slideInLeft');
          other.classList.add('slideInRight');
          observer.unobserve(entry.target);
        } 
      });
    });
    observer.observe(learn);
  }
  

    scroll(){
      document.getElementById("review-comp").scrollIntoView();
    }

}
