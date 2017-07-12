import { Component, AfterViewInit } from '@angular/core';
import { Output, Input } from '@angular/core';
import { EventEmitter, ElementRef, ContentChildren } from '@angular/core';
import { TimeRange } from './timeline.module';
import * as noUiSlider from 'nouislider';

declare var moment:any;

//vis is bundled into the global namespace
const STARTOFPERIOD = new Date('01-01-2017');
const ENDOFPERIOD = new Date('03-01-2017');
const ONEWEEKINMS = 1000*60*60*24*7;
const DATE_DISPLAY_STRING = 'MMMM Do YYYY, h:mm:ss a';

@Component({
  moduleId: module.id,
  selector: 'url-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css']
})

export class TimelineComponent implements AfterViewInit {
  //current range on sliders when dragging stops
  range = {
    start: new Date('01-14-2017'),
    end: new Date('01-19-2017')
  };

  //date to display as dragging is happening
  displayRange = {
    start: '',
    end: '',
  };

  @Output() notifyDateChange = new EventEmitter<TimeRange>();
  @Input() newDates: any;
  @ContentChildren('#date-slider') dateSlider:ElementRef;
  dataSet: any;
  timeline: any;
  lastId = 10;

  sendNewTimelineRange( values:any, handle:number) {
    if (handle === 0) {
      this.range.start = new Date(parseInt(values[handle]));
    } else if (handle === 1) {
      this.range.end = new Date(parseInt(values[handle]));
    }
    //notify the map parent that the date has changed.
    this.notifyDateChange.emit(this.range);
    console.log(new Date(parseInt(values[handle])));
  }

  updateDisplayDates( values:any, handle:number) {
    if (handle === 0) {
      this.displayRange.start = moment(parseInt(values[handle])).format(DATE_DISPLAY_STRING);
    } else if (handle === 1) {
      this.displayRange.end = moment(parseInt(values[handle])).format(DATE_DISPLAY_STRING);
    }
  }

  ngAfterViewInit() {
    this.notifyDateChange.emit(this.range);

    this.displayRange.start = moment(this.range.start).format(DATE_DISPLAY_STRING);
    this.displayRange.end = moment(this.range.end).format(DATE_DISPLAY_STRING);
    let dateSlider = <any>document.getElementById('date-slider');

    //for time range slider:
    noUiSlider.create(dateSlider, {
      start: [this.range.start.getTime(), this.range.end.getTime()],
      connect: true,
      range: {
        'min': STARTOFPERIOD.getTime(),
        'max': ENDOFPERIOD.getTime()
      },
    });

    dateSlider.noUiSlider.on('end', (values:any, handle:number) => {
      //closure needed because otherwise the this object becomes the function
      this.sendNewTimelineRange(values, handle);
    });

    dateSlider.noUiSlider.on('update', (values:any, handle:number) => {
      this.updateDisplayDates(values, handle);
    });
  }
}
