import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';



@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {


public collectionRef: any;

caps: any[] =[]
collection: any;
  

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private fb: FirebaseService
  ) { 
  }

  async getHats() {
    this.fb.getCollectionCaps(this.collectionRef).then(data => {
      if(data) {
        this.caps = data
      }
    });
  }

  async getSingleCollection() {
    this.fb.getSingleCollection(this.collectionRef).then(data => {
      if(data) {
        this.collection = data;
      }
    })
  }

goToHat(cap: any){
  this.router.navigateByUrl('shop/' + this.collectionRef + '/' + cap.nameHyphenated);
  }

  ngOnInit() {
    this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');
    if (this.collectionRef) {
      this.getSingleCollection();
      this.getHats();
    } else {
      this.collectionRef = 'originals';
      this.getSingleCollection();
      this.getHats();
    }

  }

}
