import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { NavigatorModule } from './navigator.module';

export function main() {
   describe('Map component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [NavigatorModule]
      });
    });

    it('should have all needed elements',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let mapDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(mapDOMEl.querySelector('#mapContainer')).toBeTruthy();
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<url-navigator></url-navigator>'
})
class TestComponent {}
