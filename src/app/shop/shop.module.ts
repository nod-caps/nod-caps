import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { HatPageComponent } from './hat-page/hat-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BasketComponent } from './basket/basket.component';
import { ThankYouComponent } from './thank-you/thank-you.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopRoutingModule,
    SharedModule
  ],
  declarations: [ShopComponent, HatPageComponent, BasketComponent, CheckoutComponent, ThankYouComponent]
})
export class ShopModule {}

