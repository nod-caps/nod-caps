import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cap-card',
  templateUrl: './cap-card.component.html',
  styleUrls: ['./cap-card.component.scss'],
})
export class CapCardComponent implements OnInit {


  @Input() cap: any;
  displayRating  = 5;
  wholeStars = 5;
  hasHalf = false;
  imgSrc = '';
  isMobile = false;
  constructor(
    private router: Router
  ) { }



    
  ngOnInit() {
    if (window.innerWidth < 768){
      this.isMobile=true;
    }
    if (this.cap) {
      this.imgSrc = this.cap.imageField1Mobile
    }
    if (this.cap?.rating) {
      this.displayRating = Math.round(this.cap.rating*2) / 2;
      this.wholeStars = Math.floor(this.displayRating);
      this.hasHalf = this.displayRating.toString().indexOf('.') > -1;
    }
  }

}
