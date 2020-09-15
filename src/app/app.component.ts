import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import OSM from 'ol/source/OSM';
import {
  Select,
  Translate,
  defaults as defaultInteractions,
} from 'ol/interaction';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  map: Map;
  
  ngOnInit() {
    const select = new Select();
    const translate = new Translate({
      features: select.getFeatures(),
    });

    this.map = new Map({
      interactions: defaultInteractions().extend([select, translate]),
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({ url: 'https://{a-c}.tile.osm.org/{z}/{x}/{y}.png' })
        }),
        new VectorLayer({
          source: new VectorSource({
            url: 'https://openlayers.org/en/latest/examples/data/geojson/countries.geojson',
            format: new GeoJSON(),
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 5 
      }),
    })


  }
  

  
}
