import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo.component';
import { TimeseriesComponent } from './views/timeseries/timeseries.component';
import { CurrentComponent } from './views/current/current.component';

const demoRoutes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {path: '', component: TimeseriesComponent},
      {path: 'current', component: CurrentComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(demoRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DemoRoutingModule {
}
