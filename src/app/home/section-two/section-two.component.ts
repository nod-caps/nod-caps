import { Component,  OnInit,  } from '@angular/core';

@Component({
  selector: 'app-section-two',
  templateUrl: './section-two.component.html',
  styleUrls: ['./section-two.component.scss'],
})
export class SectionTwoComponent implements OnInit {

  constructor() { }

caps = [1,2,3,4,5,6,7,8]

 
slideOpts = {
  initialSlide: 0,
  slidesPerView: 4.5,
  speed: 400
};
  




  ngOnInit() {
    

  }

  

}
