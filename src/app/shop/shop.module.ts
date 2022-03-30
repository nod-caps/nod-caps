import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { HatPageComponent } from './hat-page/hat-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CollectionComponent } from './collection/collection.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopRoutingModule,
    SharedModule,
    
  ],
  declarations: [ShopComponent, HatPageComponent, CheckoutComponent, ThankYouComponent, CollectionComponent]
})
export class ShopModule {}

