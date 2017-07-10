import { Component, AfterViewInit } from '@angular/core';
import { Output, Input } from '@angular/core';
import { EventEmitter, ElementRef, ContentChildren } from '@angular/core';
import { TimeRange } from './timeline.module';
import * as noUiSlider from 'nouislider';

//vis is bundled into the global namespace
const STARTOFPERIOD = new Date('01-01-2017');
const ENDOFPERIOD = new Date('03-01-2017');
const ONEWEEKINMS = 1000*60*60*24*7;

@Component({
  moduleId: module.id,
  selector: 'url-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css']
})

export class TimelineComponent implements AfterViewInit {
  //current range on sliders
  range = {
    start: new Date('01-14-2017'),
    end: new Date('01-19-2017')
  };
  @Output() notifyDateChange = new EventEmitter<TimeRange>();
  @Input() newDates: any;
  @ContentChildren('#date-slider') dateSlider:ElementRef;
  dataSet: any;
  timeline: any;
  lastId = 10;

  ngAfterViewInit() {
    this.notifyDateChange.emit(this.range);

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

    //happens when user moves either slider
    dateSlider.noUiSlider.on('end', (values:any, handle:number) => {
      if (handle === 0) {
        this.range.start = new Date(parseInt(values[handle]));
      } else if (handle === 1) {
        this.range.end = new Date(parseInt(values[handle]));
      }
      //notify the map parent that the date has changed.
      this.notifyDateChange.emit(this.range);
      console.log(new Date(parseInt(values[handle])));
    });


  }
}
