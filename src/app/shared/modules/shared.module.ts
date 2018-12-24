import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { MaterialModule } from './material.module';
import { HighchartslModule } from './highcharts.module';

const GoogleMapApiKey = 'AIzaSyDt89iG8LFFzqY-zlylfK25VAyAzOe8TBA';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    HighchartslModule,
    AgmCoreModule.forRoot({
      apiKey: GoogleMapApiKey
    }),
    AgmSnazzyInfoWindowModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    HighchartslModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
