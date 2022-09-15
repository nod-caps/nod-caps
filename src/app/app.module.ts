import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from './shared/shared.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { enableIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule.enablePersistence({experimentalForceOwningTab: true}),
     AngularFirestoreModule,
      AngularFireAuthModule, 
     AngularFireStorageModule,
     SharedModule,
     SwiperModule, 

  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

  provideFirestore(() => getFirestore()),

  ScullyLibModule.forRoot({
    useTransferState: true,
    alwaysMonitor: true,
  })],
  providers: [
   // StatusBar,
   // SplashScreen,
    CookieService,
    Meta,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
