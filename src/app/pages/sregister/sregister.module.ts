import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SregisterPageRoutingModule } from './sregister-routing.module';

import { SregisterPage } from './sregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SregisterPageRoutingModule
  ],
  declarations: [SregisterPage]
})
export class SregisterPageModule {}
