import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryPageRoutingModule } from './library-routing.module';
import { LibraryPage } from './library.page';
import { ComponentsModule } from '../../components/components.module';

import { MaterialModule } from '../../material.io'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryPageRoutingModule,
    MaterialModule,
    ComponentsModule
  ],
  declarations: [LibraryPage]
})
export class LibraryPageModule {}
