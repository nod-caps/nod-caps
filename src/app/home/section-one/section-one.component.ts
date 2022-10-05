import { Component, OnInit,  } from '@angular/core';
import { FirebaseService } from 'src/app/services/fb.service';



@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.scss'],
})
export class SectionOneComponent implements OnInit {



caps: any[] = [];
  collection: any;
//CHANGE THIS ONE
displayCollectionRef = 'The-Original-Collection';
activeIndex = 1;
  
constructor(
    private fb: FirebaseService,
  ) { 
  }






  async getHats() {
    this.fb.getCollectionCaps(this.displayCollectionRef).then(data => {
      if(data) {
        this.caps = data
        console.log('hello', this.caps);
      }
    });
  }

  /*
  async getSingleCollection() {
    this.fb.getSingleCollection(this.displayCollectionRef).then(data => {
      if(data) {
        this.collection = data;
      }
    })
  }*/




  ngOnInit() {

      // this.getSingleCollection();
      this.getHats();

     

  }

  

}
