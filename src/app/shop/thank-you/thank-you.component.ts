import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {

  orderNumber: any;
  order: any;
  contactRef: any;
  showFullOptIn = true;

  constructor(
    private route: ActivatedRoute,
    private basket: BasketService,
    private firestore: Firestore,
    private fire: AngularFirestore, 
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
    orders = orders.sort((a, b) => (a.date < b.date) ? 1 : -1);
    this.order = orders[0];
    this.checkIfAContact();
    if (!this.order.emailSent) {
     // this.sendMail();

    }
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
      this.showFullOptIn = false;
    }
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
    this.orderNumber = this.route.snapshot.paramMap.get('orderNumber');
    this.basket.clearBasket();
    this.getOrder();
  }

}
