import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  email: string;
  orderNumber: number;
  date: any;


  constructor(
    private firestore: Firestore,
    private fire: AngularFirestore, 

  ) { }


  async searchByOrderNumber() {
    this.orders = [];
    const q = query(collection(this.firestore, 'orders'), where("orderNumber", "==", this.orderNumber ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object.docRef = doc.ref.path.substring(doc.ref.path.lastIndexOf('/') + 1);
     this.orders.push(object);
    });
  }

  async searchByDate() {
    this.orders = [];
    const q = query(collection(this.firestore, 'orders'), where("dateString", "==", this.date ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object.docRef = doc.ref.path.substring(doc.ref.path.lastIndexOf('/') + 1);
     this.orders.push(object);
    });
  }

  async searchByEmail() {
    this.orders = [];
    const q = query(collection(this.firestore, 'orders'), where("extra.customer_details.email", "==", this.email ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object.docRef = doc.ref.path.substring(doc.ref.path.lastIndexOf('/') + 1);
     this.orders.push(object);
    });
  }

  async searchByPackaged() {
    this.orders = [];
    const q = query(collection(this.firestore, 'orders'), where("packaged", "!=", true ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object.docRef = doc.ref.path.substring(doc.ref.path.lastIndexOf('/') + 1);
      this.orders.push(object);
    });
  }

  dateChanged(ev: any) {
     this.date = ev.detail.value.split('T')[0];
     this.searchByDate();
  }


  packaged(order: any, index: any) {
        this.fire.collection('orders').doc(order.docRef).update({packaged: true})
        this.orders[index].packaged = true
      }



  ngOnInit() {
    
  }

}
