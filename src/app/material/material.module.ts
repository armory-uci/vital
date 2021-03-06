import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button/';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

const MATERIAL = [
  //Add all your material components in thus array.
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTableModule,
  MatDividerModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatGridListModule
];

@NgModule({
  imports: [MATERIAL],
  exports: [MATERIAL]
})
export class MaterialModule {}
