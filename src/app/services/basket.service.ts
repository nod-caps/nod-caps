import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketComponent } from '../shared/components/basket/basket.component';
import { myEnterFromRightAnimation } from 'src/app/animations/enter';
import { myLeaveToRightAnimation } from 'src/app/animations/leave';


@Injectable({
  providedIn: 'root'
})
export class BasketService{

    public basketSub = new BehaviorSubject<any>([]);
    currentBasket = [];
    pushObjectToArray = true
    useLocalStorage = false;

  constructor(
    private modal: ModalController
  ) {
   }


   async openModal() {
    const modal = await this.modal.create({
      component: BasketComponent,
      cssClass: 'basket-modal',
      enterAnimation: myEnterFromRightAnimation,
      leaveAnimation: myLeaveToRightAnimation,
  
    }).then (modal => {
      modal.present();
    })
   }
   checkBasket() {
    this.useLocalStorage = true;
    if (JSON.parse(localStorage.getItem('basket')) && this.useLocalStorage ) {
      this.currentBasket = JSON.parse(localStorage.getItem('basket'))
      this.basketSub.next(this.currentBasket);
    } else {
      this.currentBasket = [];
    }
   }

  editBasket(){
    this.basketSub.next(this.currentBasket);
    if (this.useLocalStorage) {
      localStorage.setItem('basket', JSON.stringify(this.currentBasket));
    }
  }

  clearBasket() {
    localStorage.removeItem('basket');
    this.currentBasket = [];
    this.basketSub.next([]);
    

  }

  getBasket(){    
    return this.currentBasket;
  }


  addItemToBasket(cap: any, quantity: number){
        this.currentBasket.forEach((elem, index) => {
            if(elem.capRef === cap.capRef){
                this.currentBasket[index].quantity = elem.quantity + quantity; 
                this.pushObjectToArray = false
            }
        });


        if (this.pushObjectToArray){
            this.currentBasket.push({cap, quantity, capRef: cap.capRef});
            this.basketSub.next(this.currentBasket);
            if (this.useLocalStorage) {
              localStorage.setItem('basket', JSON.stringify(this.currentBasket));

            }
          } else{
            this.basketSub.next(this.currentBasket);
            this.pushObjectToArray = true;   
            if (this.useLocalStorage) {
            localStorage.setItem('basket', JSON.stringify(this.currentBasket));
            }
          }
            
   

  }



}