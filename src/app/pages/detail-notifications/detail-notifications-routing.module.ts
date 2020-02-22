import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailNotificationsPage } from './detail-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: DetailNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailNotificationsPageRoutingModule {}
