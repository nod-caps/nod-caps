import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { HatPageComponent } from './hat-page/hat-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CollectionComponent } from './collection/collection.component';
import { SwiperModule } from 'swiper/angular';
import { ReviewsComponent } from './hat-page/reviews/reviews.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule,
    ReactiveFormsModule
    
  ],
  declarations: [ShopComponent, HatPageComponent, CheckoutComponent,  CollectionComponent, ReviewsComponent
  ],
})
export class ShopModule {}

