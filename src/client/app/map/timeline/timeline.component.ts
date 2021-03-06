import { Component, AfterViewInit } from '@angular/core';
import { Output, Input } from '@angular/core';
import { EventEmitter, ElementRef, ContentChildren } from '@angular/core';
import { TimeRange } from './timeline.module';
import * as noUiSlider from 'nouislider';

declare var moment:any;

//vis is bundled into the global namespace
const STARTOFPERIOD = new Date('11-01-2018');
const ENDOFPERIOD = new Date('12-01-2018');
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
    start: new Date('11-21-2018'),
    end: new Date('11-27-2018'),
  };

  // date to display as dragging is happening
  displayRange = {
    start: '',
    end: '',
  };

  @Output() notifyDateChange = new EventEmitter<TimeRange>();
  @Input() newDates: any;
  @ContentChildren('#date-slider') dateSlider:ElementRef;
  dataSet: any;
  timeline: any;
  animationId: number;
  lastId = 10;
  interval = 1000;

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

  startAnimation() {
    console.log(this.notifyDateChange);
    this.animationId = window.setInterval(() => {
      let newRange = {
        start: this.range.start,
        end: moment(this.range.start).add(1, 'hours').toDate()
      };
      this.range.start = newRange.end;
      console.log(this.notifyDateChange);
      this.notifyDateChange.emit(newRange);
    }, this.interval);
  }

  stopAnimation() {
    if (this.animationId ) {
      clearInterval(this.animationId);
    }
  }
}
