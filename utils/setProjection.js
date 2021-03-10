import proj4 from 'proj4';
import * as Proj4 from 'ol/proj/proj4';
import * as Proj from 'ol/proj';

// set projection to 27700 for the British National Grid
export const setProjection = () => {
  const spacialRef = "EPSG:27700";
  const projection = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs";
  proj4.defs(spacialRef, projection);
  Proj4.register(proj4);
  const proj27700 = Proj.get(spacialRef);
  proj27700.setExtent([ 0, 0, 700000, 1300000 ]);

  return { proj27700 };
}