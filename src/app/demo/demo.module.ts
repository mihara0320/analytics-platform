import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/modules/shared.module';
import { DemoRoutingModule } from './demo-routing.module';
import { CoreModule } from '../core/core.module';
import { DemoComponent } from './demo.component';
import { TimeseriesComponent } from './views/timeseries/timeseries.component';
import { CurrentComponent } from './views/current/current.component';

import { GoogleMapComponent } from './components/google-map/google-map.component';
import { SimpleDisplayComponent } from './components/simple-display/simple-display.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { StockChartComponent } from './components/stock-chart/stock-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { TableComponent } from './components/table/table.component';

import { DataService } from './shared/services/data.service';
import { SubjectService } from './shared/services/subject.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    DemoRoutingModule,
  ],
  declarations: [
    DemoComponent,
    TimeseriesComponent,
    CurrentComponent,
    GoogleMapComponent,
    SimpleDisplayComponent,
    GaugeComponent,
    StockChartComponent,
    BarChartComponent,
    TableComponent
  ],
  providers: [
    DataService,
    SubjectService,
  ]
})
export class DemoModule {
}
