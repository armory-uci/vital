import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button/';

const Material = [
  //Add all your material components in thus array.
  MatButtonModule
]

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
