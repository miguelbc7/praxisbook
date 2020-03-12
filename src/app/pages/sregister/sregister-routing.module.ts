import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SregisterPage } from './sregister.page';

const routes: Routes = [
  {
    path: '',
    component: SregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SregisterPageRoutingModule {}
