import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button/';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

const MATERIAL = [
  //Add all your material components in thus array.
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTableModule
];

@NgModule({
  imports: [MATERIAL],
  exports: [MATERIAL]
})
export class MaterialModule {}
