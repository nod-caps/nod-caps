import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cap-card',
  templateUrl: './cap-card.component.html',
  styleUrls: ['./cap-card.component.scss'],
})
export class CapCardComponent implements OnInit {


  @Input() cap: any;
  @Input() collectionRef: any; 
  displayRating  = 5;
  wholeStars = 5;
  hasHalf = false;
  constructor(
    private router: Router
  ) { }

  goToHat(cap: any){
    this.router.navigateByUrl('shop/' + this.collectionRef + '/' + cap.nameHyphenated);
    }

    
  ngOnInit() {
    if (this.cap?.rating) {
      this.displayRating = Math.round(this.cap.rating*2) / 2;
      this.wholeStars = Math.floor(this.displayRating);
      this.hasHalf = this.displayRating.toString().indexOf('.') > -1;
    }
  }

}
