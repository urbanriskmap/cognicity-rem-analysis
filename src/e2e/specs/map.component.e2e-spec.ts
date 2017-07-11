import { browser, element, by } from 'protractor';

describe('map', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should have a time bar', () => {
    expect(element(by.css('.noUi-base')).isPresent()).toEqual(true);
  });

  it('should have a bottom slider', () => {
    expect(element(by.css('.noUi-handle-lower')).isPresent()).toEqual(true);
  });

});
