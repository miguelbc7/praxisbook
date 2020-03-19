import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpassPageRoutingModule } from './newpass-routing.module';

import { NewpassPage } from './newpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewpassPageRoutingModule
  ],
  declarations: [NewpassPage]
})
export class NewpassPageModule {}
