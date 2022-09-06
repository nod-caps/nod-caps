import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';
import { AddReviewComponent } from '../add-review/add-review.component';
import { SeoService } from 'src/app/services/seo.service';
import { getFunctions, httpsCallable } from 'firebase/functions';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {

  // customerEmail: any;
  orderNumber: any;
  order: any;
  caps: any;
  customerUnique: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private firestore: Firestore,
    private modalCtrl: ModalController,
    private seo: SeoService
  ) { }



  async review(cap: any, index: number){
    const modal = await this.modalCtrl.create({
      component: AddReviewComponent,
      componentProps:{
        cap,
        // email: this.customerEmail, 
        order: this.order
      },
      cssClass: 'review-modal'
    }).then (modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then (result => {
      if (result.data?.review) {
        this.order.lineItems[index].cap.review = true 
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
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }



  /*async getInfo() {
     let orders = [];
    const q = query(collection(this.firestore, 'orders'), where("customerEmail", "==", this.customerEmail ));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      this.noOrder();
    } else {
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
       });
       if (orders.length > 0) {
         orders = orders.sort((a, b) => (a.date < b.date) ? 1 : -1);
         this.order = orders[0];
       } else {
         this.noOrder();
       }
    }
    
  }*/

  toShop() {
    this.router.navigateByUrl('shop');
  }


  async checkIfCustomer() {
    const functions = getFunctions();
    const checkContact = httpsCallable(functions, 'checkIfAContactUniqueName');
    checkContact({uniqueName: this.customerUnique, orderNumber: this.orderNumber}).then((result) => {
      console.log(result);
      if (result) {
        if (result.data) {
          console.log('hello', result.data);
          this.order = result.data;
          // get back order here from within fucntion
         // this.getInfo();
        } else {
         // this.noOrder(); 
        }
      }
    }).catch((err) => {
      //this.noOrder();
      console.log(err.message);
    });

     /* const q = query(collection(this.firestore, 'contacts'), where("unique_name", "==", this.customerUnique));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          if (doc.data().email === this.customerEmail) {
            this.getInfo();
          } else {
            this.noOrder();
          }
      });
      } else {
        this.noOrder();
      }*/
      
  }

  ngOnInit() {
    this.seo.generateTags({title: 'My Orders | nod caps', description:'nod caps are a small team based in Edinburgh focusing exclusively on producing quality caps for anyone to wear. Buy nod caps now. ' });
    this.seo.setRobots();

    const customerInfo = this.route.snapshot.queryParamMap.get('mo');
    if (customerInfo) {
let n = customerInfo.lastIndexOf('-');
this.orderNumber = customerInfo.substring(0, customerInfo.lastIndexOf('-'));
this.customerUnique = customerInfo.substring(n + 1);
console.log('hello', this.orderNumber, this.customerUnique);
this.checkIfCustomer();


  } else {
    this.noOrder();
  }
  }

}
