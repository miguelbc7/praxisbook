import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionalPageRoutingModule } from './adicional-routing.module';

import { AdicionalPage } from './adicional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionalPageRoutingModule
  ],
  declarations: [AdicionalPage]
})
export class AdicionalPageModule {}
