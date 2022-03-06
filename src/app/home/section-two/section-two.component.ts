import { Component,  OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';

@Component({
  selector: 'app-section-two',
  templateUrl: './section-two.component.html',
  styleUrls: ['./section-two.component.scss'],
})
export class SectionTwoComponent implements OnInit {



 
slideOpts = {
  initialSlide: 0,
  slidesPerView: 4.5,
  speed: 400
};
  


caps: any[] =[]
collection: any;
//CHANGE THIS ONE
displayCollectionRef = 'shalom';
  
constructor(
    private fb: FirebaseService,
    private router: Router
  ) { 
  }

  async getHats() {
    this.fb.getCollectionCaps(this.displayCollectionRef).then(data => {
      if(data) {
        this.caps = data
      }
    });
  }

  async getSingleCollection() {
    this.fb.getSingleCollection(this.displayCollectionRef).then(data => {
      if(data) {
        this.collection = data;
      }
    })
  }

goToHat(cap: any){
  this.router.navigateByUrl('shop/' + this.displayCollectionRef + '/' + cap.nameHyphenated);
  }

  ngOnInit() {
  
      this.getSingleCollection();
      this.getHats();

  }
  

}
