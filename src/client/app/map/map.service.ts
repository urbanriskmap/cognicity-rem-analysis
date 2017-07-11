import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { TimeRange }  from './timeline/timeline.module';
import 'rxjs/add/operator/map';


//moment is bundled into the window namespace
//because it doesn't play well with typescript/es6
//see here: https://stackoverflow.com/questions/35166168/how-to-use-moment-js-library-in-angular-2-typescript-app
declare var moment:any;

@Injectable()
export class MapService {
  constructor (
    private http: Http
  ) {}

  allReportsBetweenDates(range: TimeRange) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'localhost');

    let startIsoString = moment(range.start).format();
    let endIsoString = moment(range.end).format();
    return this.http.get('http://localhost:8001/reports/archive?' +
      'start='+ startIsoString +
      '&end=' + endIsoString +
      '&format=json&geoformat=topojson'
      ,
      {
      headers: headers
      }
    )
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'server error trying to get all reports'));
  }
}
