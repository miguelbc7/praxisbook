import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HighlightsPageRoutingModule } from './highlights-routing.module';
import { HighlightsPage } from './highlights.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HighlightsPageRoutingModule
  ],
  declarations: [HighlightsPage]
})
export class HighlightsPageModule {}
