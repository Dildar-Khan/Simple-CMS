import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatButtonModule, MatInputModule, MatCardModule,
  MatCheckboxModule, MatSelectModule, MatExpansionModule, MatPaginatorModule, MatDialogModule
} from '@angular/material';

@NgModule({
exports: [
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatDialogModule]
})
export class AngularMaterialModule {}
