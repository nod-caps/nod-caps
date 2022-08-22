import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BasketService } from 'src/app/services/basket.service';
import { FirebaseService } from 'src/app/services/fb.service';
import { BasketComponent } from 'src/app/shared/components/basket/basket.component';
import { Subscription } from 'rxjs';
import { DeliveryModalComponent } from '../delivery-modal/delivery-modal.component';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Firestore } from '@angular/fire/firestore';
import { SeoService } from 'src/app/services/seo.service';
import { myEnterFromRightAnimation } from 'src/app/animations/enter';
import { myLeaveToRightAnimation } from 'src/app/animations/leave';
import { QuickCapService } from 'src/app/services/quick-cap.service';
SwiperCore.use([Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom, ]);


@Component({
  selector: 'app-hat-page',
  templateUrl: './hat-page.component.html',
  styleUrls: ['./hat-page.component.scss'],
})
export class HatPageComponent implements OnInit {

  cap: any;
  preLoadCap: any = {};
  capRef: any;
  activeCap: any;
  capReviews: any;
  mainActiveCap: any;
  collectionRef: any;
  otherCaps: any[] = [];
  quantity: any;
  basketSub: Subscription;
  alreadyInBasket = false;
  quantityArray = [];
  capBasketMax = 5;
  loadReviews = false;
  displayRating  = 5;
  wholeStars = 5;
  capName = '';
  hasHalf = false;


  @ViewChild('hatSwiper') swiper: SwiperComponent;

  hatConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    initialSlide: 0,
    pagination: true,
    navigation: {
      nextEl: '.swiper-button-next-hat',
      prevEl: '.swiper-button-prev-hat',
    },
 
  }

  accordionNumber = 1;

  constructor(
    private route: ActivatedRoute,
    private fb: FirebaseService,
    private router: Router,
    private basket: BasketService,
private modalCtrl: ModalController,
private firestore: Firestore,
private seo: SeoService,
private alert: AlertController,
private quickCap: QuickCapService,
private toast: ToastController  ) { }

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

slideTo (val: number) {
this.swiper.swiperRef.slideTo(val);
}

  getCap(){
    this.fb.getSingleCap(this.capRef).then(async data => {
      if (data) {
        this.cap = data;
        if (this.cap.rating) {
          this.displayRating = Math.round(this.cap.rating*2) / 2;
          this.wholeStars = Math.floor(this.displayRating);
          this.hasHalf = this.displayRating.toString().indexOf('.') > -1;
        }
        this.makeActive(this.cap.imageField1);
        this.checkQuantity();
      } else {
        this.showToast('No cap info found, please refresh.');
        }
    });
  }


 accordion(val: number) {
  if (val === this.accordionNumber) {
    this.accordionNumber = 0;
  } else {
    this.accordionNumber = val;
  }
 }

  async getOtherHats() {
    this.fb.getCollectionCaps(this.collectionRef).then(data => {
      if(data) {
        this.otherCaps = data
      }
    });
  }

  quantityChanged(ev: any) {
    this.quantity = ev.detail.value;
  }

async openBasket(){
  const modal = await this.modalCtrl.create({
    component: BasketComponent,
    cssClass: 'basket-modal',
    enterAnimation: myEnterFromRightAnimation,
    leaveAnimation: myLeaveToRightAnimation,

  }).then (modal => {
    modal.present();
  })
}

  async addToBasket(cap: any) {
    this.openBasket();  
   this.basket.addItemToBasket(cap, this.quantity);
} 

  async changeQuantity(dir: string){
  if (dir === 'plus') {
    if ((this.quantity + 1) <= this.quantityArray.length) {
      this.quantity++
    } else{
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Maxed Out',
        message: 'Sorry to be this way but we are only letting people order 5 caps at a time for now!',
        buttons: [
          {
            text: 'Okay',
          }
        ]   
       });
  
      await alert.present();
    }
  } else {
    if ((this.quantity - 1) > 0) {
      this.quantity--
    }
  }
}
checkInBasket(){
  // subscribe to basket you muppet
  this.basketSub = this.basket.basketSub.subscribe((data) => { 
    if (data) {
      if (data.length > 0) {
        data.forEach((element: any) => {
          if (element.capRef === this.capRef) {
            this.alreadyInBasket = true;
          } else {
            this.alreadyInBasket = false;
          }
        });
      } else {
        this.alreadyInBasket = false;
      }
     
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
  async showToast(mesage: string) {
  const toast = await this.toast.create({
    message: mesage,
    duration: 5000,
    position: 'top', 
    color: 'tertiary'
  });
  toast.present();
}

  ngOnInit() {
     this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');
     const capNameHyp = this.route.snapshot.paramMap.get('capNameHyphenated');
    this.capName = capNameHyp.replace(/-/g, ' ');
    this.preLoadCap = this.quickCap.getCap(this.capName);
    if (this.preLoadCap) {
      this.seo.generateTags({title: this.preLoadCap.metaTitle, description: this.preLoadCap.metaDescription, image: this.preLoadCap.image });
      this.capRef = this.collectionRef + '_' + capNameHyp;
      this.getCap();
      this.getOtherHats();
      this.checkInBasket();
      this.checkOnScreen();
      this.checkOnScreenLearn();
    } else {
        this.showToast('Sorry! There was no cap found, redirecting to shop');
        this.router.navigateByUrl('/shop');
    }
    
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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          learn.classList.add('slideInLeft');
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
