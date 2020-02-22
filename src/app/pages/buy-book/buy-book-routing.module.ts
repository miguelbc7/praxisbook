import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyBookPage } from './buy-book.page';

const routes: Routes = [
  {
    path: '',
    component: BuyBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyBookPageRoutingModule {}
