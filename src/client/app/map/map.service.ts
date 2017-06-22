import { Injectable } from '@angular/core'; 
import { Http, Response, Headers } from '@angular/http'; 

import {Observable} from 'rxjs/Rx'; 
import 'rxjs/add/operator/map'; 

@Injectable()
export class MapService {
  constructor (
    private http: Http
  ) {}; 

  allReportsBetweenDates() {
    let headers = new Headers(); 
    headers.append('Access-Control-Allow-Origin', 'localhost'); 
    return this.http.get('http://localhost:8001/reports/archive?start=2017-01-13T01:00:00-0000&end=2017-01-14T01:00:00-0500', {
      headers: headers
    })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'server error trying to get all reports')); 
  }

}
