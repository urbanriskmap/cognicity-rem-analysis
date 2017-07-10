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

export class NavigatorComponent implements AfterContentInit, OnChanges {
  @Input() navigatorData:any;
  private map: any;
  private markerLayer: any;

  ngAfterContentInit() {
    let map = L.map('mapContainer', {
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
    this.markerLayer = L.geoJSON(null, {
      onEachFeature: function(feature:any, layer:any) {
        layer.bindPopup(JSON.stringify(feature.properties));
      }
    }).addTo(this.map);
  }

  onNotify(message:string):void {
    alert(message);
  }

  ngOnChanges() {
    if(this.navigatorData) {
      //clear the map:
      this.markerLayer.clearLayers();

      let result = this.navigatorData.result;
      let geoJson = topojson.feature(result, result.objects.output);
      for (let feature of geoJson.features) {
        //add a marker popup for each one
        this.markerLayer.addData(feature);
      }
    }
  }
}
