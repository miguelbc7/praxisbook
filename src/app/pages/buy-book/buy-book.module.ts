import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyBookPageRoutingModule } from './buy-book-routing.module';

import { BuyBookPage } from './buy-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyBookPageRoutingModule
  ],
  declarations: [BuyBookPage]
})
export class BuyBookPageModule {}
