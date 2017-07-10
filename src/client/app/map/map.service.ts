import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { TimeRange }  from './timeline/timeline.module';
import 'rxjs/add/operator/map';

import * as moment from 'moment';

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
    console.log('start ISO: ' + startIsoString);
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
