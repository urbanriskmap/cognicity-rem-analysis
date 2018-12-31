import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response, Headers, QueryEncoder } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { TimeRange }  from './timeline/timeline.module';
import 'rxjs/add/operator/map';

//  TODO pull this into config
const BASE_URL = 'http://data.riskmap.in';
const ARCHIVE_END_POINT = BASE_URL + '/reports/archive';

//TODO: how do we design this endpoint better?
const TEXT_QUERY_END_POINT = ARCHIVE_END_POINT + '/textquery';

//moment is bundled into the window namespace
//because it doesn't play well with typescript/es6
//see here: https://stackoverflow.com/questions/35166168/how-to-use-moment-js-library-in-angular-2-typescript-app
declare var moment:any;

// encode URI format properly when time zones are UTC+X:XX
class TimeQueryEncoder extends QueryEncoder {
    encodeKey(k: string): string {
        k = super.encodeKey(k);
        return k.replace(/\+/gi, '%2B');
    }
    encodeValue(v: string): string {
        v = super.encodeKey(v);
        return v.replace(/\+/gi, '%2B');
    }
}

@Injectable()
export class MapService {
  constructor (
    private http: Http
  ) {}

  //executes the given query between the date range specified
  executeTextQuery(query: any) {
    let headers = new Headers();

    let params: URLSearchParams = new URLSearchParams();
    params.set('start', moment(query.range.start).format());
    params.set('end', moment(query.range.end).format());
    console.log('preparedSQL');
    console.log(query.text);
    params.set('preparedSQL', query.text);
    params.set('geoformat', 'topojson');
    return this.http.get( TEXT_QUERY_END_POINT,
      {
        search: params,
        headers: headers
      }
    )
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'server error trying to get all reports'));

  }

  allReportsBetweenDates(range: TimeRange) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    let startIsoString = moment(range.start).format();
    let endIsoString = moment(range.end).format();

    let params: URLSearchParams = new URLSearchParams('', new TimeQueryEncoder());
    params.set('start', startIsoString);
    params.set('end', endIsoString);
    params.set('geoformat', 'topojson');
    console.log(params.toString());
    return this.http.get( ARCHIVE_END_POINT+'?',
      {
        search: params,
        headers: headers
      }
    )
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'server error trying to get all reports'));
  }
}
