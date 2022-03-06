import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';

@Component({
  selector: 'app-hat-page',
  templateUrl: './hat-page.component.html',
  styleUrls: ['./hat-page.component.scss'],
})
export class HatPageComponent implements OnInit {

  cap: any;
  capRef: any;
  activeCap: any;
  mainActiveCap: any;
  collectionRef: any;
  otherCaps: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FirebaseService,
    private router: Router,
  ) { }

hoverImg(capImg: any){
  this.mainActiveCap = this.activeCap;
  this.activeCap = capImg;
}
hoverImgOut() {
this.activeCap = this.mainActiveCap;
}

makeActive(capImg: any) {
  this.activeCap = capImg;
}


goToHat(cap: any){
  this.router.navigateByUrl('shop/' + this.collectionRef + '/' + cap.nameHyphenated);
  }

  getCap(){
    this.fb.getSingleCap(this.capRef).then(data => {
      this.cap = data
      this.makeActive(this.cap.imageField1);
    });
  }

  async getOtherHats() {
    this.fb.getCollectionCaps(this.collectionRef).then(data => {
      if(data) {
        this.otherCaps = data
      }
    });
  }

  ngOnInit() {
     this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');
     const capName = this.route.snapshot.paramMap.get('capNameHyphenated');
     this.capRef = this.collectionRef + '_' + capName;
    this.getCap();
    this.getOtherHats();

  }

}
