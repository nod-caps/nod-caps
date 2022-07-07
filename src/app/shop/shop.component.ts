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
  
  constructor(
    private router:Router,
    private fb: FirebaseService, 
    private seo: SeoService
  ) { }



goToCollection(collection: any){
  this.router.navigateByUrl('shop/' + collection.collectionRef);
}

  async getAllHats() {
    this.fb.getAllCaps().then(data => {
      this.allCollections = data
     });
}

  ngOnInit() {
    this.getAllHats()
    this.seo.generateTags({title: 'Nod Caps Shop', description:'Buy cheap caps online', image: '/assets/img/cap-image.jpg' });
  }

}
