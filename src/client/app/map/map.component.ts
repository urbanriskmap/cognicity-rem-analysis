import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigatorComponent } from './navigator/navigator.component';
import { MapService } from './map.service';


@Component({
  moduleId: module.id,
  selector: 'sd-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {
  map = "";

  constructor(private mapService: MapService) {
    this.map = "the map goes here";
  }

  getData(): void {
    //this.reports = this.mapService.allReportsBetweenDates();
    this.mapService.allReportsBetweenDates().subscribe(
      reports => {
        this.reports = reports;
        console.log(this.reports); 
      }, 
      err => {
        console.log(err); 
      }); 
  }

  ngOnInit(): void {
    this.getData();
  }

}
