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
    var testData = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "epoch": "1426952605000"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        7.582512743,
                        51.933292258,
                        1
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "epoch": "1426952605000"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        7.602516645,
                        51.94962073,
                        1
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "epoch": "1426952609000"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        7.61132039,
                        51.967614681,
                        1
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "epoch": "1426952608000"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        7.595284208,
                        51.976391375,
                        1
                    ]
                }
            }
        ]
    }

    var map = L.map("mapContainer", {
      zoomControl: false,
      center: L.latLng(6.1751, 106.8650),
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
