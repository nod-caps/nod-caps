import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlCollectionComponent } from './control-collection/control-collection.component';
import { CreateCollectionComponent } from './control-collection/create-collection/create-collection.component';
import { SingleCollectionComponent } from './control-collection/single-collection/single-collection.component';
import { ControlComponent } from './control.component';
import { CreateCapComponent } from './create-cap/create-cap.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: ControlComponent,
  },
  {
          path: 'create-cap/:collectionRef', // child route path
          component: CreateCapComponent, // child route component that the router renders
}, 
{
  path: 'create-collection', // child route path
  component: CreateCollectionComponent, // child route component that the router renders
}, 
{
  path: 'edit-collection/:collectionRef', // child route path
  component: CreateCollectionComponent, // child route component that the router renders
}, 
{
  path: 'edit-cap/:collectionRef/:capNameHyphenated', // child route path
  component: CreateCapComponent, // child route component that the router renders
}, 
{
    path: 'collections', // child route path
    component: ControlCollectionComponent, // child route component that the router renders
},  
{
  path: 'collections/:collectionRef', // child route path
  component: SingleCollectionComponent, // child route component that the router renders
},
{
    path: 'orders', // child route path
    component: OrdersComponent, // child route component that the router renders
},  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule {}
