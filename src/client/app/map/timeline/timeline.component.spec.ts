import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { TimelineModule } from './timeline.module';

export function main() {
   describe('Timeline component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [TimelineModule]
      });
    });

    it('should have all needed elements',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let timelineDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(timelineDOMEl.querySelector('#start-date')).toBeTruthy();
            expect(timelineDOMEl.querySelector('#end-date')).toBeTruthy();
            expect(timelineDOMEl.querySelector('#date-slider')).toBeTruthy();
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<url-timeline></url-timeline>'
})
class TestComponent {}
