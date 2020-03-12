import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyBookPageRoutingModule } from './buy-book-routing.module';
import { BuyBookPage } from './buy-book.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BuyBookPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BuyBookPage]
})
export class BuyBookPageModule {}
