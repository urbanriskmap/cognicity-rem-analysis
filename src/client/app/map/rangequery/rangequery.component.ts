import { Component, AfterViewInit } from '@angular/core';
import { Output, Input } from '@angular/core';
import { EventEmitter, ElementRef, ContentChildren } from '@angular/core';
import { RangeQuery } from './rangequery.module';

declare var moment:any;

//vis is bundled into the global namespace
const STARTOFPERIOD = new Date('01-01-2017');
const ENDOFPERIOD = new Date('03-01-2017');
const ONEWEEKINMS = 1000*60*60*24*7;
const DATE_DISPLAY_STRING = 'MMMM Do YYYY, h:mm:ss a';

@Component({
  moduleId: module.id,
  selector: 'url-range-query',
  templateUrl: 'rangequery.component.html',
  styleUrls: ['rangequery.component.css']
})

export class RangeQueryComponent {
  @Output() notifySubmitRangeQuery = new EventEmitter<RangeQuery>();
  private _querybox: string;

  set querybox(value: string) {
    this._querybox = value;
  }

  public submitRangeQuery(event: any) {
    if (this._querybox) {
      this.notifySubmitRangeQuery.emit(this._querybox);
    }
  }
}
