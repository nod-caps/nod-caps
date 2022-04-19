import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/fb.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {


  allCollections: any
  
  constructor(
    private router:Router,
    private fb: FirebaseService, 
  ) { }



goToCollection(collection: any){
  console.log('hello', collection);
  this.router.navigateByUrl('shop/' + collection.collectionRef);
}

  async getAllHats() {
    this.fb.getAllCaps().then(data => {
      this.allCollections = data
      console.log('hello', this.allCollections);
     });
}

  ngOnInit() {
    this.getAllHats()
  }

}
