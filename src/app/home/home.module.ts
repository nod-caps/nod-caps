import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LandingBannerComponent } from './landing-banner/landing-banner.component';
import { SectionOneComponent, } from './section-one/section-one.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    SwiperModule, 
    LazyLoadImageModule, 

  ],
  declarations: [HomePage, LandingBannerComponent, SectionOneComponent, ]
})
export class HomePageModule {}
