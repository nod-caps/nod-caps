import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HatPageComponent } from './hat-page/hat-page.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
  {
          path: 'hat-name', // child route path
          component: HatPageComponent, // child route component that the router renders
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
