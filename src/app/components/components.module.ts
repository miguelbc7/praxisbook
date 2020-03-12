import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { SatinizerPipe } from '../pipes/satinizer.pipe';
import { NumbersPipe } from '../pipes/numbers.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SatinizerPipe,
    NumbersPipe
  ],
  imports: [
    IonicModule
  ],
  exports: [
    NavbarComponent,
    SatinizerPipe,
    NumbersPipe
  ]
})
export class ComponentsModule { }
