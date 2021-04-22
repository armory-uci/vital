import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button/';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

const MATERIAL = [
  //Add all your material components in thus array.
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
];

@NgModule({
  imports: [MATERIAL],
  exports: [MATERIAL]
})
export class MaterialModule {}
