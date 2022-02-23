import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';

@Component({
  selector: 'app-hat-page',
  templateUrl: './hat-page.component.html',
  styleUrls: ['./hat-page.component.scss'],
})
export class HatPageComponent implements OnInit {

  cap: any;
  capRef: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FirebaseService
  ) { }

  getCap(){
    this.fb.getSingleCap(this.capRef).then(data => {
      this.cap = data
    });
  }

  ngOnInit() {
     const collectionRef = this.route.snapshot.paramMap.get('collectionRef');
     const capName = this.route.snapshot.paramMap.get('capNameHyphenated');
     this.capRef = collectionRef + '_' + capName;

  }

}
