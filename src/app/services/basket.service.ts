import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

    public basketSub = new BehaviorSubject<any>([]);
    currentBasket = [];
    pushObjectToArray = true

  constructor(
    
  ) { }


  editBasket(){
    this.basketSub.next(this.currentBasket);
    console.log('hello')
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
          } else{
            this.basketSub.next(this.currentBasket);
            this.pushObjectToArray = true;   
          }
            
   

  }



}