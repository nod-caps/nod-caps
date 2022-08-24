import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,  ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { environment } from 'src/environments/environment';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FirebaseService } from 'src/app/services/fb.service';
declare var Stripe;
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';
import { ThisReceiver } from '@angular/compiler';


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
  outOfStock = false;
  loadingButton = false;
  

  constructor(
    private basket: BasketService,
    private modalCtrl: ModalController,
    private router: Router,
    private fb: FirebaseService,    
    private firestore: Firestore,
    private alertCtrl: AlertController,
    private alert: AlertController,
  ) {}

  quantityChanged(index: any) {
    //getting called twice as changing in here
    if (this.basketArray[index].errorMessage && this.basketArray[index].errorMessage.indexOf('low on stock') >-1) {
      this.basketArray[index].errorMessage = undefined;
    }
   
    this.basketArray[index].itemPrice =
    this.basketArray[index].cap.price * this.basketArray[index].cap.price;
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
      if (querySnapshot.empty) {
        this.checkOutError('We cant find the cap you are looking for, please try again');
        return;
      } else {
        querySnapshot.forEach(async (doc) => {
          stripeCaps.push(doc.data());
          const q1 = query(collection(doc.ref, 'prices'));
          const querySnapshot1 = await getDocs(q1);
          if (querySnapshot1.empty) {
            this.checkOutError('We cant find the cap you are looking for, please try again');
            return;
          } else {
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
          }
         
        
        });
      }

    });
  }

  /* checkoutFirebase(): void {
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
  
    
   
  }*/

goToStripe(){
      //change below
      if(this.checkoutArray.length > 0) {
        var stripe = Stripe('pk_test_51Kj1mgKGPCnyjU4r7zk7Ly0QKuHsDVxMNTDH8pFkhIpdlVJ1181Ddcal7xgum9cHzirt3neW6c13GOzAfBwrloGr00OgvsNccG');
        const functions = getFunctions();
        const checkout = httpsCallable(functions, 'stripeCheckout');
        checkout({checkoutArray: this.checkoutArray}).then((result) => {
          stripe.redirectToCheckout({
              sessionId: result.data,
            })
            .then((result: any) => {
              console.log(result.error.message);
            });
        }).catch((err) => {
          this.checkOutError('There was an error with this order, please try again or contact us');
        });
      } else {
        this.checkOutError('There was an error with your order, please try again');
      }
     
}

goTo(link: string) {
  this.router.navigateByUrl(link);
}

toShop() {
  this.router.navigateByUrl('shop');
  this.close();

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
        this.basketArray[index].quantityArray = this.checkQuantity( this.basketArray[index].cap.quantity);
      });
    });
  }


async checkOutError(message: string) {
  this.loadingButton = false;
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Checkout Error',
    message: message,
    buttons: [
      {
        text: 'Okay',
      }
    ]   
   });

  await alert.present();
}

  checkIfSoldOut() {
    this.loadingButton = true;
    if (this.basketArray < 1) {
      this.checkOutError('We found no caps in your basket, please try again');
    } else {
      this.outOfStock = false;
      this.basketArray.forEach((item: any, index: any) => {
        this.fb.getSingleCap(item.cap.capRef).then(async data => {
          if (data) {
            if (item.quantity > data.quantity) {
             this.outOfStock = true;
  
             if ( data.quantity === 0) {
              if (this.basketArray.length === 1) {
                this.basketArray[index].errorMessage = 'Sorry! This item appears to be out of stock. Please remove it from your basket, hopefully other caps are still in stock.'
              } else {
                this.basketArray[index].errorMessage = 'Sorry! This item appears to be out of stock. Please remove it from your basket and try again.';
              }
             } else {
              this.basketArray[index].errorMessage = 'Sorry! We seem to be low on stock. We only have ' +  data.quantity + ' left. Please ammend your order and try again';
              this.basketArray[index].quantityArray = this.checkQuantity( data.quantity);
             } 
            }
            
            if ((index === (this.basketArray.length - 1))  &&  !this.outOfStock) {
  
              this.getStripeInfo();
  
            }  else if (this.outOfStock && (index === (this.basketArray.length - 1) )) {
              this.checkOutError('It looks like you are ordering something we may no longer have, please check any error messages and try again!');
              return;
            }
          } else {
  
           this.checkOutError('There was an error with your basket, please remove all items and try again.');
           return;
          };
  
      });
    });
    }

}



async changeQuantity(dir: string, index){
  if (dir === 'plus') {
    if ((this.basketArray[index].quantity + 1) <= this.basketArray[index].quantityArray.length) {
      this.basketArray[index].quantity++
      this.quantityChanged(index);
    } else{
      let message="";
      if (this.basketArray[index].quantityArray.length === 5) {
        message = "Sorry to be this way but we are only letting people order 5 caps at a time for now!"
      } else {
        message = "Sorry but it looks like no more hats are in stock!"

      }
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Maxed Out',
        message: message,
        buttons: [
          {
            text: 'Okay',
          }
        ]   
       });
  
      await alert.present();
    }
  } else {
    if ((this.basketArray[index].quantity - 1) > 0) {
      this.basketArray[index].quantity--
      this.quantityChanged(index);

    }
  }
}

  close() {
    this.modalCtrl.dismiss();
   }
  checkQuantity(capItemQuantity: any) {
    if (capItemQuantity < this.capBasketMax) {
      return Array.from({length:capItemQuantity},(v,k)=>k+1)
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
