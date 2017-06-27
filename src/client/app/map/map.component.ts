import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigatorComponent } from './navigator/navigator.component';
import { MapService } from './map.service';
import { TimeRange } from './timeline/timeline.module';

@Component({
  moduleId: module.id,
  selector: 'sd-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {
  map = "";
  reports: any;
  defaultRange = { start: new Date('2017-01-13T01:00:00-0000'), end: new Date('2017-01-14T01:00:00-0500')};

  constructor(private mapService: MapService) {
    this.map = "the map goes here";
  }

  getData(range: TimeRange): void {
    this.mapService.allReportsBetweenDates(range).subscribe(
      reports => {
        this.reports = reports;
        console.log(this.reports);
      },
      err => {
        console.log(err);
      });
  }

  onDateChange(range: TimeRange) :void {
    //the user has dragged the start or end bar, now need to ask the server
    //for that slice of time
    console.log("got new date range");
    console.log(range);
    this.getData(range);
  }

  ngOnInit(): void {
    this.getData(this.defaultRange);
  }
}
