import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { MapModule } from './map.module';

export function main() {
   describe('Map component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [MapModule]
      });
    });

    it('should have all needed elements',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let mapDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(mapDOMEl.querySelector('#map-outerwrap')).toBeTruthy();
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<url-map></url-map>'
})
class TestComponent {}
