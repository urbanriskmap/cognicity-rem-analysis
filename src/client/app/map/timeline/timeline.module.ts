import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline.component';


export interface TimeRange {
  start: Date;
  end: Date;
}

@NgModule({
  declarations: [TimelineComponent],
  exports: [TimelineComponent]
})
export class TimelineModule { }
