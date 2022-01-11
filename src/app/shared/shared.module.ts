import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BannerSwiperComponent } from './components/banner-swiper/banner-swiper.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      ],
  declarations: [
      BannerSwiperComponent,
      HeaderComponent
  ],
  providers: [],
  exports: [
    BannerSwiperComponent,
    HeaderComponent
  ]
})
export class SharedModule { }