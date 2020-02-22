import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailNotificationsPageRoutingModule } from './detail-notifications-routing.module';

import { DetailNotificationsPage } from './detail-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailNotificationsPageRoutingModule
  ],
  declarations: [DetailNotificationsPage]
})
export class DetailNotificationsPageModule {}
