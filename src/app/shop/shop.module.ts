import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { HatPageComponent } from './hat-page/hat-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CollectionComponent } from './collection/collection.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule
    
  ],
  declarations: [ShopComponent, HatPageComponent, CheckoutComponent,  CollectionComponent],
})
export class ShopModule {}

