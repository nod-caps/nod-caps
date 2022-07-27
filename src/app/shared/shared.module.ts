import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { AboutComponent } from '../admin/about/about.component';
import { PrivacyComponent } from '../admin/privacy/privacy.component';
import { ReturnsComponent } from '../admin/returns/returns.component';
import { TermsComponent } from '../admin/terms/terms.component';
import { OrdersComponent } from '../control/orders/orders.component';
import { DeliveryModalComponent } from '../shop/delivery-modal/delivery-modal.component';
import { ThankYouComponent } from '../shop/thank-you/thank-you.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { BannerSwiperComponent } from './components/banner-swiper/banner-swiper.component';
import { BasketComponent } from './components/basket/basket.component';
import { BoastBannerComponent } from './components/boast-banner/boast-banner.component';
import { CapCardComponent } from './components/cap-card/cap-card.component';
import { CapDisplayComponent } from './components/cap-display/cap-display.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SignUpBannerComponent } from './components/sign-up-banner/sign-up-banner.component';
import { SignUpHolderComponent } from './components/sign-up-holder/sign-up-holder.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SocialSliderComponent } from './components/social-slider/social-slider.component';
import { OurCapsComponent } from './components/our-caps/our-caps.component';
import { SocialButtonsComponent } from './social-buttons/social-buttons.component';
import { WhatNextComponent } from './components/what-next/what-next.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule, 
        AngularFirestoreModule,
        AngularFireAuthModule, 
        AngularFireStorageModule,
        SwiperModule,
        RouterModule
      ],
  declarations: [
      BannerSwiperComponent,
      HeaderComponent,
      BasketComponent,
      AdminLoginComponent,
      CapCardComponent,
      FooterComponent,
      CookieConsentComponent,
      OrdersComponent,
      SignUpComponent,
      ThankYouComponent,
      SignUpHolderComponent,
      MyOrdersComponent,
      AddReviewComponent,
      SocialSliderComponent,
      BoastBannerComponent,
      SignUpBannerComponent,
      DeliveryModalComponent,
      AboutComponent,
      PrivacyComponent,
      ReturnsComponent,
      TermsComponent, 
      SocialButtonsComponent,
      CapDisplayComponent,
      OurCapsComponent,
      WhatNextComponent

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
    OrdersComponent,
    SignUpComponent,
    ThankYouComponent,
    SignUpHolderComponent,
    MyOrdersComponent,
    AddReviewComponent,
    SocialSliderComponent,
    BoastBannerComponent,
    SignUpBannerComponent,
    DeliveryModalComponent,
    AboutComponent,
    PrivacyComponent,
    ReturnsComponent,
    TermsComponent,
    SocialButtonsComponent,
    CapDisplayComponent,
    OurCapsComponent,
    WhatNextComponent
  ]
})
export class SharedModule { }