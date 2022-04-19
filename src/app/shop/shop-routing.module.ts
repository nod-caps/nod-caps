import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CollectionComponent } from './collection/collection.component';
import { HatPageComponent } from './hat-page/hat-page.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
 /* {
    path: ':collectionRef', // child route path
    component: CollectionComponent, // child route component that the router renders
  },  */
  {
          path: ':collectionRef/:capNameHyphenated', // child route path
          component: HatPageComponent, // child route component that the router renders
},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
