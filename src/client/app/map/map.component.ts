import { Component } from '@angular/core';
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
export class MapComponent {
  map = "";
  reports: any;
  newDates: any;
  defaultRange = { start: new Date('2017-01-13T07:00:00+0700'), end: new Date('2017-01-14T11:10:00+0700')};


  constructor(private mapService: MapService) {
    this.map = "the map goes here";
  }

  getData(range: TimeRange): void {
    this.mapService.allReportsBetweenDates(range).subscribe(
      reports => {
        console.log('all reports between dates');
        this.reports = reports;
        this.newDates = [];
        for (let each of reports.result.objects.output.geometries) {
          console.log(each);
          this.newDates.push(each.properties.created_at);
        }
        console.log(this.reports);
      },
      err => {
        console.log(err);
      });
  }

  onDateChange(range: TimeRange) :void {
    //the user has dragged the start or end bar, now need to ask the server
    //for that slice of time
    console.log('Got new date range');
    console.log(range);
    this.getData(range);
  }
}
