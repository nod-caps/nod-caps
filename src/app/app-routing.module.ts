import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { DeliveryComponent } from './admin/delivery/delivery.component';
import { PrivacyComponent } from './admin/privacy/privacy.component';
import { ReturnsComponent } from './admin/returns/returns.component';
import { SitemapComponent } from './admin/sitemap/sitemap.component';
import { TermsComponent } from './admin/terms/terms.component';
import { AuthService } from './services/auth.service';
import { AdminLoginComponent } from './shared/components/admin-login/admin-login.component';
// import { MaintenanceComponent } from './shared/components/maintenance/maintenance.component';
import { MyOrdersComponent } from './shared/components/my-orders/my-orders.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ReviewCapsComponent } from './shared/components/review-caps/review-caps.component';
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
    path: 'returns',
    component: ReturnsComponent,
  },
  {
  path: 'delivery',
    component: DeliveryComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  }, 
  {path: '404', component: NotFoundComponent},
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'nod-sitemap',
    component: SitemapComponent,
  },
  {
    path: 'cheers',
    component: ThankYouComponent,
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
  }, 
  {
    path: 'add-review',
    component: ReviewCapsComponent,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/404'},
  // add the below and remove the above for maintenance
/*
  {
    path: '',
    component: MaintenanceComponent,
  },
  {path: '**', redirectTo: ''},
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
