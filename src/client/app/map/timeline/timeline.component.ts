import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TimeRange } from './timeline.module';

//vis is bundled into the global namespace
declare var vis: any;

@Component({
  moduleId: module.id,
  selector: 'sd-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css']
})

export class TimelineComponent {
  range = {
    start: new Date('2017-01-12'),
    end: new Date('2017-01-30')
  };
  @Output() notifyDateChange = new EventEmitter<TimeRange>();

  constructor() {
  }

  ngAfterViewInit() {
    //TODO fix this! should not be using document.get ...
    let container = document.getElementById('vis-timeline');

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet([
      {id: 1, content: 'item 1', start: '2017-01-20', type: 'point'},
      {id: 2, content: 'item 2', start: '2017-01-14', type: 'point'},
      {id: 3, content: 'item 3', start: '2017-01-18', type: 'point'},
      {id: 4, content: 'item 4', start: '2017-01-16', end: '2014-04-19', type: 'point'},
      {id: 5, content: 'item 5', start: '2017-01-25', type: 'point'},
      {id: 6, content: 'item 6', start: '2017-01-27', type: 'point'}
    ]);

    // Configuration for the Timeline
    var options = {
      width: "100%",
      showCurrentTime: true,
    };

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);

    timeline.addCustomTime(this.range.start, 'start');
    timeline.addCustomTime(this.range.end, 'end');

    timeline.on('timechanged', (properties: any) => {
      if(properties.id === 'start') {
        this.range.start = properties.time;
        console.log('start:' + properties.time.toISOString());
        this.notifyDateChange.emit(this.range);
      } else if (properties.id === 'end') {
        this.range.end = properties.time;
        console.log('end:' + properties.time.toISOString());
        this.notifyDateChange.emit(this.range);
      } else {
        //error
        console.error(properties);
      }
    });
  }
}
