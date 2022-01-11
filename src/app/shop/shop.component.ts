import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {


  caps = [1,2,3,4,5,6,7,8]
  
  constructor(
    private router:Router
  ) { }

goToHat(){
this.router.navigateByUrl('shop/hat-name');
}

  ngOnInit() {}

}
