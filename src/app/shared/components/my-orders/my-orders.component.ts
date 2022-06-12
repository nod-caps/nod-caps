import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';
import { AddReviewComponent } from '../add-review/add-review.component';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {

  customerEmail: any;
  order: any;
  caps: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private firestore: Firestore,
    private modalCtrl: ModalController
  ) { }



  async review(cap: any, index: number){
    const modal = await this.modalCtrl.create({
      component: AddReviewComponent,
      componentProps:{
        cap
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


  async noOrder(){
    this.router.navigateByUrl('/home');
    const toast = await this.toastCtrl.create({
      message: 'No order found please contact us',
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }


  async getInfo() {
     let orders = [];
    const q = query(collection(this.firestore, 'orders'), where("customerEmail", "==", this.customerEmail ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     orders.push(doc.data());
    });
    if (orders.length > 0) {
      orders = orders.sort((a, b) => (a.date < b.date) ? 1 : -1);
      this.getCaps(orders[0]);
    } else {
      this.noOrder();
    }
  }

  getCaps(order: any) {
    this.caps = [];
    order.lineItems.forEach(async (cap) => {
      const q = query(collection(this.firestore, 'caps'), where("description", "==", cap.description));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.caps.push(doc.data());
      });
      console.log('hello', this.caps);
    });
  }

  ngOnInit() {
    const customerInfo = this.route.snapshot.queryParamMap.get('mo');
    if (customerInfo) {
     
let n = customerInfo.lastIndexOf('-');
this.customerEmail = customerInfo.substring(0, customerInfo.lastIndexOf('-'));
this.getInfo();



  } else {
    this.noOrder();
  }
  }

}
