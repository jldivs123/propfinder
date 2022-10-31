import { FC, useRef } from "react";
import ReactMap, { Marker, MapRef } from "react-map-gl";
import { getAreaOfPolygon, getCenterOfBounds, convertArea } from "geolib";
import { LngLatBounds, LngLat } from "mapbox-gl";
import Typography from "@mui/material/Typography";

import { MAPBOX_PUBLIC_TOKEN, Coordinates } from "../../constants";

// * https://github.com/visgl/react-map-gl/issues/750
export const Markers = (
  onClick: (args: any) => any,
  properties: any,
  activeProperty: any
) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <>
      {properties.map((property: any, index: number) => {
        const latitude = property.geojson.geometry.coordinates[0];
        const longitude = property.geojson.geometry.coordinates[1];
        const price =
          property.geojson.properties.minimumSellingPrice.replace(
            /[, ]+/g,
            ""
          ) ?? "0";
        return (
          <Marker
            key={"marker-" + index}
            latitude={longitude}
            longitude={latitude}
          >
            <div
              className="flex justify-center items-center shadow-lg rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={() => onClick(property)}
              style={{
                width: "64px",
                background:
                  activeProperty?.pk === property.pk ? "#1e293b" : "white",
                height: "32px",
                color: activeProperty?.pk === property.pk ? "white" : "black",
              }}
            >
              <Typography fontWeight={600} fontSize={14}>
                &#8369;{formatter.format(Number(price))}
              </Typography>
            </div>
          </Marker>
        );
      })}
    </>
  );
};

export const MapComponent: FC<
  Coordinates & { viewStateHandler: (value: any) => void }
> = ({ children, lat, lng, viewStateHandler }) => {
  // * Philippine Area of Responsibility
  const southWest = new LngLat(114.873046875, 5.090944175033399);
  const northEast = new LngLat(128.4521484375, 20.014645445341365);
  const bounds = new LngLatBounds(southWest, northEast);
  const mapRef = useRef<MapRef | null>(null);

  const stateHandler = (value: any) => {
    const map = mapRef.current;
    if (map) {
      const bounds: any = map.getMap()?.getBounds();
      // * `polygon` variable represents the rectangular area
      const polygon: any = [
        [bounds._ne.lat, bounds._sw.lng],
        [bounds._ne.lat, bounds._ne.lng],
        [bounds._sw.lat, bounds._ne.lng],
        [bounds._sw.lat, bounds._sw.lng],
      ];
      const area = convertArea(getAreaOfPolygon(polygon), "km2");
      const center = getCenterOfBounds(polygon);
      viewStateHandler({
        area,
        center,
        bounds: {
          minLat: bounds._sw.lat,
          maxLat: bounds._ne.lat,
          minLng: bounds._sw.lng,
          maxLng: bounds._ne.lng,
        },
      });
    }
  };

  return (
    <ReactMap
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 4,
      }}
      ref={mapRef}
      onMove={(e: any) => stateHandler(e.viewState)}
      style={{
        maxWidth: "100%",
        width: "100%",
        minWidth: "100%",
        minHeight: "100px",
        flexGrow: "1",
      }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      // maxBounds={bounds}
      maxZoom={18}
      minZoom={3}
    >
      {children}
    </ReactMap>
  );
};
