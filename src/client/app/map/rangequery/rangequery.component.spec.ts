import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { RangeQueryModule } from './rangequery.module';

export function main() {
   describe('RangeQuery component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [RangeQueryModule]
      });
    });

    it('should have all needed elements',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let rangeQueryDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(rangeQueryDOMEl.querySelector('#rangequery-outerwrap')).toBeTruthy();
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<url-range-query></url-range-query>'
})
class TestComponent {}
