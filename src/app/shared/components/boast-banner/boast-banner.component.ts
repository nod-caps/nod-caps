import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom, ]);

@Component({
  selector: 'app-boast-banner',
  templateUrl: './boast-banner.component.html',
  styleUrls: ['./boast-banner.component.scss'],
})
export class BoastBannerComponent implements OnInit {


  isMobile = true;
  constructor() { }



  slidesPerView = 4
  boastConfig: SwiperOptions = {
    slidesPerView: this.slidesPerView,
    spaceBetween: 0,
    initialSlide: 2,
    pagination: true,
    loop: true,
    autoplay: {
      delay: 5000,
    },  
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 4,
      },
    }
   }
   @ViewChild('boastSwiper') swiper: SwiperComponent;

  ngOnInit() {

    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
      this.boastConfig.initialSlide = 0;
    }

  }

}
