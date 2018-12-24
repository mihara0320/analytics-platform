import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.module';

import { Error404Component } from './error-404/error-404.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [
    Error404Component,
    LoadingSpinnerComponent
  ],
  exports: [
    Error404Component,
    LoadingSpinnerComponent
  ],
})
export class CoreModule { }
