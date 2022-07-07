import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { environment } from 'src/environments/environment';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FirebaseService } from 'src/app/services/fb.service';
declare var Stripe;
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  @Input() inModal = false;
  basketSub: Subscription;
  basketArray: any;
  basketLength = 0;
  totalPrice = 0;
  checkoutArray: any;
  capBasketMax = 5;
  

  constructor(
    private basket: BasketService,
    private modalCtrl: ModalController,
    private router: Router,
    private fb: FirebaseService,    
    private firestore: Firestore,
  ) {}

  quantityChanged(ev: any, index: any) {
    //getting called twice as changing in here
    this.basketArray[index].quantity = ev.detail.value;
    this.basketArray[index].itemPrice =
    ev.detail.value * this.basketArray[index].cap.price;
    this.getTotalPrice();
    this.basket.editBasket();
  }

  remove(index: any) {
    this.basketArray.splice(index, 1);
    this.getTotalPrice();
    this.basket.editBasket();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.basketArray.forEach((item: any, index: any) => {
      this.totalPrice += item.itemPrice;
    });
  }

  getStripeInfo(): void {
    this.checkoutArray = [];
    this.basketArray.forEach(async (cap, index) => {
      const stripeCaps = [];
      const q = query(collection(this.firestore, 'products'), where("metadata.id", "==", cap.capRef));
      const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    stripeCaps.push(doc.data());
    const q1 = query(collection(doc.ref, 'prices'));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (doc1) => {
      this.checkoutArray.push({
        name: stripeCaps[0].name,
        description: stripeCaps[0].description,
        images: stripeCaps[0].images,
        amount: Math.round(doc1.data().unit_amount),
        currency: "gbp",
        quantity: cap.quantity,
        // price:doc1.data().poduct
      });  
      if (index === this.basketArray.length -1 && doc1.data()) {
        this.goToStripe()
      }
    });
  
  });
    });
  }

  checkoutFirebase(): void {
    this.checkoutArray = [];
    this.basketArray.forEach((cap, index) => {
      this.fb.getStripeCap(cap.capRef).then((data:any) => {
        this.checkoutArray.push({
          name: data.name,
          description: data.description,
          images: data.images,
          amount: Math.round(20 * 100),
          currency: "gbp",
          quantity: cap.quantity,
        });
        if (index === this.basketArray.length -1) {
        //  this.goToStripe()
        }
      });
    });
  
    
   
  }

goToStripe(){
      var stripe = Stripe(environment.stripe.push);
      const functions = getFunctions();
      const checkout = httpsCallable(functions, 'stripeCheckout');
      checkout({checkoutArray: this.checkoutArray}).then((result) => {
        stripe.redirectToCheckout({
            sessionId: result.data,
          })
          .then((result: any) => {
            console.log(result.error.message);
          });
      });
}

goTo(link: string) {
  this.router.navigateByUrl(link);
}

  editBasket() {
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('basket');
  }


  ngOnInit() {
    //do i need to subscribe here
    this.basket.basketSub.subscribe((data) => {
      this.basketLength = 0;
      this.totalPrice = 0;
      this.basketArray = data;
      this.basketArray.forEach((item: any, index: any) => {
        this.basketArray[index].itemPrice = item.quantity * item.cap.price;
        this.basketLength = this.basketLength + item.quantity
        this.totalPrice += this.basketArray[index].itemPrice;
        this.basketArray[index].quantityArray = this.checkQuantity( this.basketArray[index])
      });
    });
  }


  close() {
    this.modalCtrl.dismiss();
  }
  checkQuantity(capItem: any) {
    if (capItem.cap.quantity < this.capBasketMax) {
      return Array.from({length:capItem.cap.quantity},(v,k)=>k+1)
    } else {
      return Array.from({length:this.capBasketMax},(v,k)=>k+1)
    }
    
    }

  ngOnDestroy(): void {
    if (this.basketSub) {
      this.basketSub.unsubscribe();
    }
  }
}
