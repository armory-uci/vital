import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button/';
import {MatCardModule} from '@angular/material/card';

const Material = [
  //Add all your material components in thus array.
  MatButtonModule,
  MatCardModule
]

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
