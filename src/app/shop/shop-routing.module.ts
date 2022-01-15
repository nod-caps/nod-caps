import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HatPageComponent } from './hat-page/hat-page.component';
import { ShopComponent } from './shop.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
  {
          path: 'hat-name', // child route path
          component: HatPageComponent, // child route component that the router renders
},  
{
  path: 'basket',
  component: BasketComponent,
},
{
  path: 'checkout',
  component: CheckoutComponent,
},
{
  path: 'cheers',
  component: ThankYouComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
