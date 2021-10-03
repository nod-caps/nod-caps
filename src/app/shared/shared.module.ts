import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BannerSwiperComponent } from './components/banner-swiper/banner-swiper.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      ],
  declarations: [
      BannerSwiperComponent
  ],
  providers: [],
  exports: [
    BannerSwiperComponent
  ]
})
export class SharedModule { }