import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { setProjection } from './utils/setProjection'
import TileWMSSource from 'ol/source/TileWMS';
import axios from 'axios';

const token = process.env.STAGE_TOKEN;

const getTile = (tile: any, url: string) => {
  axios
  .get(url, {
    responseType: 'arraybuffer',
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  })
  .then(response => {
    const arrayBufferView = new Uint8Array(response.data);
    const blob = new Blob([arrayBufferView]);
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
      tile.getImage().src = imageUrl;
    })
    .catch(error => {
      console.log(error);
    });
};



const { proj27700 } = setProjection();

new Map({
  layers: [
    new TileLayer({
      source: new TileWMSSource({
        url: process.env.TILE_SERVER_URL,
        params: { reqLayer: 'detail' },
        tileLoadFunction: getTile,
      })
    }) ],
  target: 'map',
  view: new View({
    center: [530035, 180380],
    zoom: 14,
    projection: proj27700,
  }),
});
