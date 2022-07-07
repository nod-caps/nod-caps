import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {

  orderNumber: any;
  order: any;
  contactRef: any;
  showOptIn = false;

  
  constructor(
    private route: ActivatedRoute,
    private basket: BasketService,
    private firestore: Firestore,
    private fire: AngularFirestore, 
    private router: Router,
    private toastCtrl: ToastController
  ) { }


  async getOrder() {
    let orders = [];
    const q = query(collection(this.firestore, 'orders'), where("orderNumber", "==", this.orderNumber));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object.docRef = doc.ref.path.substring(doc.ref.path.lastIndexOf('/') + 1);
      orders.push(object);
    });
    if (orders.length > 0) {
      orders = orders.sort((a, b) => (a.date < b.date) ? 1 : -1);
      this.order = orders[0];
     //  this.checkIfExpired();
      this.checkIfAContact();
      if (!this.order.emailSent) {
        //this.sendMail();
      }
    } else {
this.noOrder();
    }
     
 
      
    
  
  }


  async checkIfExpired() {
   const fiveMinsFromPurchase = this.order.date  + (5 * 60 * 1000);
   const currentTime = new Date().getTime();
   if (currentTime > fiveMinsFromPurchase) {
    this.router.navigateByUrl('/home');
    const toast = await this.toastCtrl.create({
      message: 'Page has expired 5 mins after purchase',
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
   }
  }

  async noOrder() {
    this.router.navigateByUrl('/home');
    const toast = await this.toastCtrl.create({
      message: 'No order found please contact us',
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();

  }

  async checkIfAContact() {
    const contactRefs = [];
    const q = query(collection(this.firestore, 'contacts'), where("email", "==", this.order.customerEmail));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc.data().meta.state === 'SUCCESS'){
        contactRefs.push(doc.ref.path.substring(doc.ref.path.lastIndexOf('/') + 1));
    }
    });
    if (contactRefs.length > 0) {
      this.contactRef = contactRefs[0];
      this.showOptIn = false;
      this.addReviewToExsistingContact();
    }  else {
      this.showOptIn = true;
    }
  }

  addReviewToExsistingContact() {
    
    this.fire.collection('contacts').doc(this.contactRef).update({line: 'ask_review'});  
  }

sendMail(){
     const functions = getFunctions();
     const sendMail = httpsCallable(functions, 'addPurchaserToMailchimp2');
    sendMail({order: this.order}).then((result) => {
      if (result) {
        this.markAsSent();
      }
    });
  }

  markAsSent() {
    this.fire.collection('orders').doc(this.order.docRef).update({emailSent: true});

  }

  ngOnInit() {
    const orderNumber = this.route.snapshot.queryParamMap.get('on');
    if (orderNumber) {
      this.orderNumber = orderNumber;
      this.basket.clearBasket();
      this.getOrder();
    } else{
      this.noOrder();
    }
  }

}
