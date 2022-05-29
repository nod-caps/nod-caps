import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BasketService{

    public basketSub = new BehaviorSubject<any>([]);
    currentBasket = [];
    pushObjectToArray = true
    useLocalStorage = false;

  constructor(
    
  ) {
   }

   checkBasket() {
     console.log('hello there');
    if (JSON.parse(localStorage.getItem('basket'))) {
      this.currentBasket = JSON.parse(localStorage.getItem('basket'))
      this.basketSub.next(this.currentBasket);
    } else {
      this.currentBasket = [];
    }
   }

  editBasket(){
    this.basketSub.next(this.currentBasket);
    localStorage.setItem('basket', JSON.stringify(this.currentBasket));
  }

  clearBasket() {
    this.basketSub.next([]);
    localStorage.removeItem('basket');
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
            localStorage.setItem('basket', JSON.stringify(this.currentBasket));
          } else{
            this.basketSub.next(this.currentBasket);
            this.pushObjectToArray = true;   
            localStorage.setItem('basket', JSON.stringify(this.currentBasket));
          }
            
   

  }



}