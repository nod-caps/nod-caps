import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom, ]);


@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.scss'],
})
export class SectionOneComponent implements OnInit {



changingWidth = false;
 slidesPerView = 5

config: SwiperOptions = {
  slidesPerView: this.slidesPerView,
  spaceBetween: 20,
  initialSlide: 0,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // centeredSlides: true,
  // centeredSlidesBounds: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    640: {
      slidesPerView: 2,
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 3,
    },
    960: {
      slidesPerView: 4,
    },
    1040: {
      slidesPerView: 5,
    }
  }
}

@ViewChild('swiper') swiper: SwiperComponent;
  
width = 500;

caps: any[] =[]
collection: any;
//CHANGE THIS ONE
displayCollectionRef = 'shalom';
activeIndex = 1;
  
constructor(
    private fb: FirebaseService,
    private router: Router,
  ) { 
  }


  goToShop(){
    this.router.navigateByUrl('/shop');
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
