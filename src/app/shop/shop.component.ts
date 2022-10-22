import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/fb.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {


  allCollections: any
  caps: any[] =[];
  
  constructor(
    private router:Router,
    private fb: FirebaseService, 
    private seo: SeoService
  ) { }



goToCollection(collection: any){
  this.router.navigateByUrl('shop/' + collection.collectionRef);
}

 /* async getAllHats() {
    this.fb.getAllCaps().then(data => {
      this.allCollections = data
     });
}*/

async getHats() {
  this.fb.getCollectionCaps('The-Original-Collection').then(data => {
    if(data) {
      this.caps = data
    }
  });
}

  ngOnInit() {
    this.seo.generateTags({title: 'Shop nod caps | The Best UK Baseball & Dad Caps', description:'Buy high quality baseball and dad caps in a variety of colours at nod caps. Shop now - free UK delivery.'});
    this.getHats()

  }

}
