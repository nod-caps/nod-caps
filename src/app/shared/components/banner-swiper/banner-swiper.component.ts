import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-swiper',
  templateUrl: './banner-swiper.component.html',
  styleUrls: ['./banner-swiper.component.scss'],
})
export class BannerSwiperComponent implements OnInit {


 
  constructor() { }



  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    loop: true,
    speed: 400
  };
  ngOnInit() {}

}
