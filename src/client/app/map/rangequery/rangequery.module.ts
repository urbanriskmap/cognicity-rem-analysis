import { NgModule } from '@angular/core';
import { RangeQueryComponent } from './rangequery.component';
import { TimeRange } from '../timeline/timeline.module';

export interface RangeQuery {
  query: string;
  range: TimeRange;
}

@NgModule({
  declarations: [RangeQueryComponent],
  exports: [RangeQueryComponent]
})
export class RangeQueryModule { }
