import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdersComponent } from '../control/orders/orders.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { BannerSwiperComponent } from './components/banner-swiper/banner-swiper.component';
import { BasketComponent } from './components/basket/basket.component';
import { CapCardComponent } from './components/cap-card/cap-card.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule, 
        AngularFirestoreModule,
        AngularFireAuthModule, 
        AngularFireStorageModule,
      ],
  declarations: [
      BannerSwiperComponent,
      HeaderComponent,
      BasketComponent,
      AdminLoginComponent,
      CapCardComponent,
      FooterComponent,
      CookieConsentComponent,
      OrdersComponent

  ],
  providers: [],
  exports: [
    BannerSwiperComponent,
    HeaderComponent,
    BasketComponent, 
    AdminLoginComponent,
    CapCardComponent,
    FooterComponent, 
    CookieConsentComponent,
    OrdersComponent
  ]
})
export class SharedModule { }