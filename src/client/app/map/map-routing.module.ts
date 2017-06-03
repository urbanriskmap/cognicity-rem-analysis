import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'map', component: MapComponent }
    ])
  ],
  exports: [RouterModule]
})
export class MapRoutingModule { }
