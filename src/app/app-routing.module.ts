import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { PrivacyComponent } from './admin/privacy/privacy.component';
import { ReturnsComponent } from './admin/returns/returns.component';
import { TermsComponent } from './admin/terms/terms.component';
import { OrdersComponent } from './control/orders/orders.component';
import { AuthService } from './services/auth.service';
import { AdminLoginComponent } from './shared/components/admin-login/admin-login.component';
import { BasketComponent } from './shared/components/basket/basket.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { ThankYouComponent } from './shop/thank-you/thank-you.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
  {
    path: 'control',
    canActivate: [ AuthService ],
    loadChildren: () => import('./control/control.module').then( m => m.ControlModule)
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'delivery-returns',
    component: ReturnsComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
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
    path: 'cheers/:orderNumber',
    component: ThankYouComponent,
  },
  {
    path: 'orders', // child route path
    component: OrdersComponent, // child route component that the router renders
},  

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
