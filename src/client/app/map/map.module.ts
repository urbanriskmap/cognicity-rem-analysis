import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MapComponent } from './map.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [HttpModule, CommonModule, MapRoutingModule],
  declarations: [MapComponent, NavigatorComponent, TimelineComponent],
  exports: [MapComponent]
})
export class MapModule { }
