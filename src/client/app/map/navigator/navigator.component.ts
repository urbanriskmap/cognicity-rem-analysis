import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import * as topojson from 'topojson';
import * as L from 'leaflet';

@Component({
  moduleId: module.id,
  selector: 'sd-navigator',
  templateUrl: 'navigator.component.html',
  styleUrls: ['navigator.component.css']
})

export class NavigatorComponent {
  private map: any;

  ngAfterContentInit() {
    let map = L.map("mapContainer", {
      zoomControl: false,
      center: L.latLng(-6.1751, 106.8650),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [
        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
          ext: 'png',
          subdomains: 'abc'
        }),
      ]
    });
    this.map = map;
  }

  @Input() navigatorData:any;

  constructor() {
  }

  ngOnChanges() {
    console.log("In Navigator: ");
    if(this.navigatorData) {
      console.log(this.navigatorData);
      console.log(topojson);
      let result = this.navigatorData.result;
      let geoJson = topojson.feature(result, result.objects.output);
      console.log("map");
      console.log(this.map);
      L.geoJSON(geoJson).addTo(this.map);
      console.log(geoJson);
    }
  }

}
