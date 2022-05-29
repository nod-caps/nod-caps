import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { ControlRoutingModule } from './control-routing.module';
import { ControlComponent } from './control.component';
import { CreateCapComponent } from './create-cap/create-cap.component';
import { ControlCollectionComponent } from './control-collection/control-collection.component';
import { SwiperModule } from 'swiper/angular';
import { SingleCollectionComponent } from './control-collection/single-collection/single-collection.component';
import { CreateCollectionComponent } from './control-collection/create-collection/create-collection.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ControlRoutingModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule, 
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
  ],
  declarations: [ControlComponent, CreateCapComponent, ControlCollectionComponent, SingleCollectionComponent, CreateCollectionComponent]
})
export class ControlModule { }
