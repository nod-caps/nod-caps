import { Component,  OnInit, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, ]);


@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.scss'],
})
export class SectionOneComponent implements OnInit {


disableEnd = false;
disableStart = false;
 

config: SwiperOptions = {
  slidesPerView: 1.4,
  spaceBetween: 20,
  initialSlide: 1,
  centeredSlides: true,
  centeredSlidesBounds: true,

}

@ViewChild('swiper') swiper: SwiperComponent;
  


caps: any[] =[]
collection: any;
//CHANGE THIS ONE
displayCollectionRef = 'shalom';
activeIndex = 1;
  
constructor(
    private fb: FirebaseService,
    private router: Router
  ) { 
  }


  goToShop(){
    this.router.navigateByUrl('/shop');
  }

onSlideChange(e: any) {
  this.swiper.swiperRef = e;
  if (this.swiper.swiperRef.isEnd){
    this.disableEnd = true
  } else {
    this.disableEnd = false
  }

  if (this.swiper.swiperRef.isBeginning){
    this.disableStart = true;
  } else {
    this.disableStart = false
  }

  this.activeIndex = this.swiper.swiperRef.activeIndex;


}

  slideNext(){
    this.swiper.swiperRef.slideNext(400);
  }
  slidePrev(){
    this.swiper.swiperRef.slidePrev(400);
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


  ngOnInit() {
  
      this.getSingleCollection();
      this.getHats();

  }

  

}
