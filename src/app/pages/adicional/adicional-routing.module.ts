import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionalPage } from './adicional.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionalPageRoutingModule {}
