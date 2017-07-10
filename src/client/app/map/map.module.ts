import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [CommonModule, MapRoutingModule],
  declarations: [MapComponent, NavigatorComponent, TimelineComponent],
  exports: [MapComponent]
})
export class MapModule { }
