import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailNotificationsPageRoutingModule } from './detail-notifications-routing.module';
import { DetailNotificationsPage } from './detail-notifications.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DetailNotificationsPageRoutingModule
  ],
  declarations: [DetailNotificationsPage]
})
export class DetailNotificationsPageModule {}
