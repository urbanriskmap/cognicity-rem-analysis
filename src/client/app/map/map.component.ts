import { Component } from '@angular/core'; 
import { NavigatorComponent } from './navigator/navigator.component'; 

@Component({
  moduleId: module.id, 
  selector: 'sd-map', 
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent {
  map = ""; 

  constructor() {
    this.map = "the map goes here";
  }

}
