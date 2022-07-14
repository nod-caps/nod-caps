import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Router } from '@angular/router';
SwiperCore.use([Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom, ]);

@Component({
  selector: 'app-social-slider',
  templateUrl: './social-slider.component.html',
  styleUrls: ['./social-slider.component.scss'],
})
export class SocialSliderComponent implements OnInit {
@Input() showTitle = true;

  slidesPerView = 5
  config: SwiperOptions = {
    slidesPerView: this.slidesPerView,
    spaceBetween: 20,
    initialSlide: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
      1040: {
        slidesPerView: 5,
      }
    }
   }
   @ViewChild('swiper') swiper: SwiperComponent;

  constructor(
    private router: Router
  ) { }

  goToHat() {
    console.log('hello');
    this.router.navigateByUrl('/shop/shalom/hello-there')
  }

  ngOnInit() {}

}
