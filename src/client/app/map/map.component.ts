import { Component } from '@angular/core';
import { NavigatorComponent } from './navigator/navigator.component';
import { MapService } from './map.service';
import { TimeRange } from './timeline/timeline.module';

@Component({
  moduleId: module.id,
  selector: 'url-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers: [MapService]
})
export class MapComponent {
  reports: any;
  newDates: any;

  constructor(private mapService: MapService) {
  }

  getData(range: TimeRange): void {
    this.mapService.allReportsBetweenDates(range).subscribe(
      reports => {
        console.log('all reports between dates');
        this.reports = reports;
        this.newDates = [];
        for (let each of reports.result.objects.output.geometries) {
          this.newDates.push(each.properties.created_at);
        }
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

  public rangeQuerySubmitted(text: string) {
    console.log('range query on map parent');
  }
}
