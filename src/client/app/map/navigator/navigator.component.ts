import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { AfterContentInit, OnChanges } from '@angular/core';
import { AsyncSubject } from 'rxjs/Rx';
import * as topojson from 'topojson';
import * as mapboxgl from 'mapbox-gl';
// import * as hexagons  from '../../../assets/chennaiGrid.geojson';

@Component({
  moduleId: module.id,
  selector: 'url-navigator',
  templateUrl: 'navigator.component.html',
  styleUrls: ['navigator.component.css']
})
export class NavigatorComponent implements AfterContentInit, OnChanges {
  @Input() navigatorData:any;
  private markerLayer: any;

  private mapLoaded: AsyncSubject<any>;

  constructor() {
    this.mapLoaded = new AsyncSubject();
  }

  loadHexagons() {
    this.mapLoaded.subscribe( map => {
      // console.log(hexagons);
    });
  }

  ngAfterContentInit() {
    console.log('TRYING to init map');

    const mapConfig = {
      accessToken: 'pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNqZnY2cGxndzN3M3AyeHMydGVyeHcyMWIifQ.D6K1H9c8CTnP6twGYdtDKA',
      center: { lat: 13.04, lng: 80.26}, // map initializes on india
      initZoom: 10,
      minZoom: 4,
      baseMapStyle: 'mapbox://styles/urbanriskmap/cjfvacwic1cfc2smiwbyfwcs4'
    };

    (mapboxgl as typeof mapboxgl).accessToken =  mapConfig.accessToken;
    let map = new mapboxgl.Map({
      attributionControl: false,
      container: 'mapContainer',
      center: mapConfig.center,
      zoom: mapConfig.initZoom,
      minZoom: mapConfig.minZoom,
      style: mapConfig.baseMapStyle,
      hash: false,
      preserveDrawingBuffer: true
    });

    map.on('load', () => {
      this.mapLoaded.next(map);
      this.mapLoaded.complete();
    });

    this.loadHexagons();
  }

  onNotify(message:string):void {
    // alert(message);
  }


  ngOnChanges() {
    if(this.navigatorData) {

      this.mapLoaded.subscribe( map => {
        let result = this.navigatorData.result;
        let geoJson = topojson.feature(result, result.objects.output);
        console.log(geoJson);

        let mapboxGeoJsonSpec = {
          'type': 'geojson',
          'data': geoJson
        };

        if (map.getLayer('ReportsLayer')) {
          map.removeLayer('ReportsLayer');
        }

        // Clear sources and re-add new data
        if (map.getSource('Reports')) {
          map.removeSource('Reports');
        }

        map.addSource('Reports', mapboxGeoJsonSpec);
        map.addLayer(
          {
            'id': 'ReportsLayer',
            'source': 'Reports',
            'type': 'symbol',
            'layout': {
              'icon-image': 'map_floodIcon',
              'icon-allow-overlap': true,
              'icon-size': 0.75
            }
          });

        // from mapboxgl examples: https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/
        // Create a popup, but don't add it to the map yet.
        let popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.on('click', 'ReportsLayer', (e:any) => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer';

          let coordinates = e.features[0].geometry.coordinates.slice();
          const reportData = e.features[0].properties;
          let imgHtml = '';
          if (reportData.image_url !== 'null' ) {
            imgHtml = '<img src=' + reportData.image_url + ' >';
          }

          // the popup is styled by the .mapbox-gl-popup in the main.css class
          // It needs to be global
          let description = imgHtml + '<p>'+ reportData.text + '</p>';

          console.log('Report data');
          console.log(reportData);

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        });

        map.on('mouseleave', 'ReportsLayer', function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    }
  }
}
