import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MapComponent } from './map.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { TimelineModule } from './timeline/timeline.module';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [HttpModule, CommonModule, MapRoutingModule, TimelineModule],
  declarations: [MapComponent, NavigatorComponent],
  exports: [MapComponent]
})
export class MapModule { }
